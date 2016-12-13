class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :tags

  def url
    baseUrl = "#{object.scheme}://#{object.host}#{object.path}"
    if(object.params_serialized.length > 0)
      baseUrl += "?#{object.params_serialized}"
    end
    baseUrl
  end

  def tags
    object.tags_serialized.split(',')
  end
end
