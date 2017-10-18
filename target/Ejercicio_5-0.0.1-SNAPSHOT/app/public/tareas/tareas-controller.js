
var module = angular.module('mpApp.public');


module.controller('searchTareasController', function ($scope, $log, tareasResource) {
    var pc = this;


    pc.tareas = [];

    pc.search = function () {
        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        tareasResource.queryAll({"max": 100}, successCallback, errorCallback);
    };

    pc.delete = function (id) {

    };

    pc.search();
});

module.controller('newTareasController', function ($scope, $log, $location, tareasResource) {
    $scope.location = $location.path();
    $scope.tareas = {};
    
    $scope.save = function () {

        var horas = new Date($scope.tareas.hora);
       
        $scope.tareas.fechaLimite.setHours(horas.getHours());
        $scope.tareas.fechaLimite.setMinutes(horas.getMinutes());

        var successCallback = function (data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            $location.path('/tareas');
        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while persisting');
        };

        tareasResource.save($scope.tareas, successCallback, errorCallback);

    };


    $scope.cancel = function () {
        $location.path('/tareas');
    };

});