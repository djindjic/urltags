import {Link} from '../models/link';
import {map, prop} from 'ramda';
import constants from '../constants';

export class LinkService {
    static $inject = ['$http', 'baseUri'];

    constructor(private $http: ng.IHttpService,
                private baseUri: string) {
    }

    getAll(): ng.IPromise<Link[]> {
        return this.$http
            .get(`${this.baseUri}links`)
            .then(prop('data'))
            .then(prop('data'))
            .then(map(Link.fromObject));
    }

    load(url: string): ng.IPromise<any> {
        return this.$http
            .post(`${this.baseUri}links/load`, {url: url})
            .then(prop('data'));
    }

    save(link: any): ng.IPromise<any> {
        return this.$http
            .post(`${this.baseUri}links`, {link: link})
            .then(prop('data'));
    }
}

export default angular.module('linkServiceModule', [
    constants.name
]).service('linkService', LinkService);
