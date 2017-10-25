
var module = angular.module('mpApp.public');

module.controller('searchTareasController', function ($scope, $log, tareasResource, searchByTextoResource, searchByCategoriaResource, $uibModal, categoriasResource) {
    var pc = this;

    pc.textoBusqueda;
    pc.tareas = [];
    pc.categorias = [];

    pc.search = function () {

        $log.info('Busca todas');

        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        pc.textoBusqueda = "";

        tareasResource.queryAll({"max": 100}, successCallback, errorCallback);
    };

    pc.searchCategorias = function () {

        $log.info('Busca todas las categorias');

        var successCallback = function (data, responseHeaders) {
            pc.categorias = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        categoriasResource.queryAll(successCallback, errorCallback);
    };

    pc.searchByCategory = function (categoria) {

        $log.info('Busquedea por categoria... ' + categoria.id);

        var successCallback = function (data, responseHeaders) {
            pc.tareas = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        searchByCategoriaResource.queryByCategoria({"idCategoria": categoria.id}, successCallback, errorCallback);
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

    pc.openCategoria = function () {


        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: './app/public/tareas/newCategoria.html',
            size: 'sm',
            controllerAs: pc,
            controller: function ($scope, $uibModalInstance) {

                $scope.categoria = {};

                $scope.guardar = function () {

                    var successCallback = function (data, responseHeaders) {
                        $log.info('save successfuly ' + data);
                        pc.searchCategorias();

                    };

                    var errorCallback = function (responseHeaders) {
                        $log.error('error while persisting');
                    };

                    categoriasResource.save($scope.categoria, successCallback, errorCallback);

                    $scope.cerrar();
                };

                $scope.cerrar = function () {

                    $uibModalInstance.dismiss('cancel');
                };


            }
        });


    };

    pc.searchCategorias();


});


module.controller('newTareasController', function ($scope, $log, $location, tareasResource, categoriasResource, categoriasByNombreResource) {
    $scope.location = $location.path();
    $scope.tareas = {};
    $scope.categorias = [];
    $scope.categoria = {};

    $scope.save = function () {

        var successCallback = function (data, responseHeaders) {

            $log.info('data: ' + data);
            if (data == '') {
                $log.info('no encontro la categoria ' + data);

                var successCallback = function (data, responseHeaders) {
                    $log.info('se guardo la categoria' + data);
                    $scope.categoria = data;

                    $scope.saveTarea();

                };

                var errorCallback = function (responseHeaders) {
                    $log.error('error while persisting');
                };

                categoriasResource.save($scope.categoria, successCallback, errorCallback);
            } else {
                $scope.categoria = data;

                $scope.saveTarea();

            }

        };

        var errorCallback = function (responseHeaders) {

            $log.error('error while persisting');
        };

        categoriasByNombreResource.queryByNombre({"nombre": $scope.categoria.nombre}, successCallback, errorCallback);

    };


    $scope.saveTarea = function () {

        var successCallback = function (data, responseHeaders) {
            $log.info('saved tarea successfuly ' + data);
            $location.path('/tareas');
        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while persisting');
        };

        tareasResource.save($scope.tareas, successCallback, errorCallback);


        $scope.tareas.categoria = $scope.categoria;


    }

    $scope.cancel = function () {
        $location.path('/tareas');
    };


    $scope.searchCategorias = function () {

        $log.info('Busca todas las categorias');

        var successCallback = function (data, responseHeaders) {
            $scope.categorias = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        categoriasResource.queryAll(successCallback, errorCallback);
    };


    $scope.isOpen = false;

    $scope.openCalendar = function (e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };

    $scope.searchCategorias();

});