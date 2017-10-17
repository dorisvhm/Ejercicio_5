
var module = angular.module('mpApp.public');


module.controller('searchTareasController', function ($scope, $log, tareasResource) {
    var pc = this;
    
    pc.tareas = [];
    
    pc.search = function(){
        var successCallback = function(data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

         tareasResource.queryAll({"max":100}, successCallback, errorCallback);
    };
    
    pc.delete = function(id){
        
    };
    
    pc.search();
});


module.controller('editTareasController', function ($scope, $log, $stateParams, $location, tareasResource) {
    $scope.location = $location.path();
    $scope.tareas = {};
    $scope.get = function(){
        var successCallback = function(data, responseHeaders) {
            $log.info('retrieved successfuly ' + JSON.stringify(data));
            $scope.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while searching ' + responseHeaders);
        };
        
        tareasResource.query({id:$stateParams.id}, successCallback, errorCallback);
        
    };

    $scope.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            $location.path('/tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

         //tareasResource.update($scope.tareas, successCallback, errorCallback);
         
         $scope.tareas.$update(successCallback, errorCallback);

    };
    
    $scope.delete = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('removed successfuly ' + data);
            $location.path('/tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

         //tareasResource.update($scope.tareas, successCallback, errorCallback);
         
         $scope.tareas.$remove(successCallback, errorCallback);

    };
    
    $scope.get();

});

module.controller('newTareasController', function ($scope, $log, tareasResource) {

    $scope.tareas = {};

    $scope.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            $location.path('/tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

         tareasResource.save($scope.tareas, successCallback, errorCallback);

    };
    
    $scope.cancel = function () {
        $scope.tareas = {};
    };

});