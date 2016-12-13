import 'angular';
import '../styles/screen.scss';
import linkTagsApplication from './components/linkTagsApplication';

angular.bootstrap(document, [
    linkTagsApplication.name
], {
    strictDi: true
});