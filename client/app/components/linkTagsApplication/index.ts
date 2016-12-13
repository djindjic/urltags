import 'angular';
import './style.scss';
import linkServiceModule, {LinkService} from '../../services/link';
import {Link} from '../../models/link';

export class UrlTagsApplicationController {
    static $inject = ['linkService'];

    links: Link[];
    url: string;
    loadedLink: any;

    constructor(private linkService: LinkService) {
        this.loadAll();
    }

    loadAll(): void {
        this.linkService.getAll().then((links: Link[]) => {
            this.links = links;
        });
    }

    load(): void {
        this.linkService.load(this.url).then((data: any) => {
            this.loadedLink = data;
        });
    }

    save(): void {
        if(!this.isAnyTagSelected()) {
            alert('You need to select one tag at least');
            return;
        }
        this.linkService.save(this.loadedLink).then((data: any) => {
            this.loadedLink = null;
            this.url = '';
            this.loadAll();
        });
    }

    isAnyTagSelected(): boolean {
        return this.loadedLink && this.loadedLink.tags.filter((tag) => tag.value).length > 0;
    }
}

export default angular.module('urlTagsApplication', [
    linkServiceModule.name
]).component('linkTagsApplication', {
    template: require('./template.html'),
    controller: UrlTagsApplicationController
});