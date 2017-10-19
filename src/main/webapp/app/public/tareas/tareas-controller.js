
var module = angular.module('mpApp.public');

module.controller('getCategoriasController', function ($scope) {

});

module.controller('searchTareasController', function ($scope, $log, tareasResource) {
    var pc = this;
    pc.textoBusqueda;

    $scope.listaCategorias = [{llave: "1", valor: "TAREAS DOMESTICAS"}, {llave: "2", valor: "JAVA"}, {llave: "3", valor: "SISTEMAS OPERATIVOS"}];

    pc.tareas = [];

    pc.search = function () {

        $log.error('Busca todas');

        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        tareasResource.queryAll({"max": 100}, successCallback, errorCallback);
    };

    pc.searchByCategory = function (categoria) {

        $log.info('categoria... ' + categoria.llave);

        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        tareasResource.queryByCategoria({"idCategoria": categoria.llave}, successCallback, errorCallback);
    };

    pc.searchByTexto = function ()
    {
        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        $log.info('Texto a buscar... ' + searchByTexto);

        tareasResource.queryByTexto({"texto": texto}, successCallback, errorCallback);

    };

    pc.delete = function (id) {

    };

    pc.search();
});


module.controller('editTareasController', function ($scope, $log, $stateParams, $location, tareasResource) {
    $scope.location = $location.path();
    $scope.tareas = {};
    $scope.get = function () {
        var successCallback = function (data, responseHeaders) {
            $log.info('retrieved successfuly ' + JSON.stringify(data));
            $scope.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while searching ' + responseHeaders);
        };

        tareasResource.query({id: $stateParams.id}, successCallback, errorCallback);

    };

    $scope.save = function () {

        var successCallback = function (data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            $location.path('/tareas');
        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while persisting');
        };

        $scope.tareas.$update(successCallback, errorCallback);

    };

    $scope.get();

});

module.controller('newTareasController', function ($scope, $log, $location, tareasResource) {
    $scope.location = $location.path();
    $scope.tareas = {};

    $scope.categorias = [{llave: "1", valor: "TAREAS DOMESTICAS"}, {llave: "2", valor: "JAVA"}, {llave: "3", valor: "SISTEMAS OPERATIVOS"}];


    $scope.save = function () {

        $scope.tareas.idCategoria = $scope.categoriaSelected;

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