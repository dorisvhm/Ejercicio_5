/**
 * Main module setter
 * @type angular app
 */
var module = angular.module('mpApp', [
    'mpApp.public',
    'oc.lazyLoad',
    'angular-loading-bar',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'mpApp.ui'
]);

module.config(function ($locationProvider, $stateProvider) {
    $locationProvider.hashPrefix();

});