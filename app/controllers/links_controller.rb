require 'nokogiri'
require 'open-uri'

class LinksController < ApplicationController
    def index
        @links = Link.all
        render json: @links
    end

    def load
        url = params['url']
        uri = URI(url)

        link = findIfLinkExist(uri)
        tag_serialized = []
        tags = []

        if(link)
            tag_serialized = link.tags_serialized.split(',')
            tags = tag_serialized.map { |tag| { text: tag, value: true} }
        end

        top_ten_words = get_top_ten_words_on_url(url)
        top_ten_words.map do |word|
            if(!tag_serialized.include?(word))
                tags.push({ text: word, value: false })
            end
        end

        render json: {
            url: url,
            tags: tags
        }
    end

    def create
        newLink = params['link']
        uri = URI(newLink['url'])

        link = findIfLinkExist(uri)

        if(link)
            tags = link.tags_serialized.split(',')
            getTrueTags(newLink['tags']).each do |tag|
                if(!tags.include? tag)
                    tags.push(tag)
                end
            end
            link.tags_serialized = tags.join(',')
            link.save
        else
            Link.create({
                scheme: uri.scheme,
                host: uri.host,
                path: uri.path,
                params_serialized: orderParams(uri.query),
                tags_serialized: serializeTags(newLink['tags'])
            })
        end
        render json: newLink
    end

    private

    def findIfLinkExist(uri)
        Link.where(
            host: uri.host,
            path: uri.path,
            params_serialized: orderParams(uri.query)
        ).first
    end

    def serializeTags(tags)
        getTrueTags(tags)
            .join(',')
    end

    def getTrueTags(tags)
        tags.select { |tag| tag['value'] }
            .map { |tag| tag['text'] }
    end

    def orderParams(query)
        params_serialized = ''
        if query
            params_serialized = query.split('&').sort!.join('&')
        end
        params_serialized
    end

    def frequencies(words)
        Hash[
            words.group_by(&:downcase)
                .map{ |word,instances| [word,instances.length] }
                .sort_by(&:last).reverse
        ]
    end

    def get_top_ten_words_on_url(url)
        html = Nokogiri::HTML(open url)
        html.css('script').remove
        words = html.at('body').inner_text.scan(/\w+/)
        most_frequent = frequencies(words)
                            .to_a
                            .select { |word| word[0].length > 2 }
                            .select { |word| word[1] > 2 }
                            .map { |word| word[0] }

        most_frequent[0..9]
    end
end
