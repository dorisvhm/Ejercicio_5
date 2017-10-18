/**
 * Main module setter
 * @type angular app
 */
var module = angular.module('mpApp', [
    'mpApp.public',
    'oc.lazyLoad',
    'angular-loading-bar'
]);

module.config(function ($locationProvider, $stateProvider) {
    $locationProvider.hashPrefix();

});