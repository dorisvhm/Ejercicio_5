
var module = angular.module('mpApp.public');

module.controller('getCategoriasController', function ($scope) {

});

module.controller('searchTareasController', function ($scope, $log, tareasResource, searchByTextoResource, searchByCategoriaResource, $uibModal) {
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
        
         pc.textoBusqueda = "";

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

        searchByCategoriaResource.queryByCategoria({"idCategoria": categoria.llave}, successCallback, errorCallback);
    };

    pc.searchByTexto = function ()
    {        
        $log.info('Texto a buscar... ' + pc.textoBusqueda);
        
        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };
        
        searchByTextoResource.queryByTexto({"texto": pc.textoBusqueda}, successCallback, errorCallback);

    };

    pc.update = function (tarea) {

        var successCallback = function (data, responseHeaders) {
            $log.info('updating successfuly ' + data);

        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while persisting');
        };

        tareasResource.update(tarea, successCallback, errorCallback)

    };


    pc.open = function (tarea) {

        pc.tarea = tarea;

        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: './app/public/tareas/modal.html',
            size: 'sm',
            controllerAs: pc,
            controller: function ($scope, $uibModalInstance) {

                $scope.tarea = pc.tarea;
                $scope.descrip = $scope.tarea.descripcion;
                $scope.actualizar = function (descrip) {

                    $scope.tarea.descripcion = descrip;
                    var successCallback = function (data, responseHeaders) {
                        $log.info('updating successfuly ' + data);

                    };

                    var errorCallback = function (responseHeaders) {
                        $log.error('error while persisting');
                    };

                    tareasResource.update($scope.tarea, successCallback, errorCallback)

                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cerrar = function () {

                    $uibModalInstance.dismiss('cancel');
                };


            }
        });
    };
    
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
    
   

    $scope.isOpen = false;

    $scope.openCalendar = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };

});