
var module = angular.module('mpApp.public');

module.controller('searchEventosController', function ($scope, $log, eventosResource, searchByTextoResource, searchByLugarResource, $uibModal, lugaresResource) {
    var pc = this;

    pc.textoBusqueda;
    pc.eventos = [];
    pc.lugares = [];

    pc.search = function () {

        $log.info('Busca todas');

        var successCallback = function (data, responseHeaders) {
            pc.eventos = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        pc.textoBusqueda = "";

        eventosResource.queryAll({"max": 100}, successCallback, errorCallback);
    };

    pc.searchLugares = function () {

        $log.info('Busca todas los lugares');

        var successCallback = function (data, responseHeaders) {
            pc.lugares = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        lugaresResource.queryAll(successCallback, errorCallback);
    };

    pc.searchByCategory = function (lugar) {

        $log.info('Busquedea por lugar... ' + lugar.id);

        var successCallback = function (data, responseHeaders) {
            pc.eventos = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        searchByLugarResource.queryByLugar({"idLugar": lugar.id}, successCallback, errorCallback);
    };

    pc.searchByTexto = function ()
    {
        $log.info('Texto a buscar... ' + pc.textoBusqueda);

        var successCallback = function (data, responseHeaders) {
            pc.eventos = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        searchByTextoResource.queryByTexto({"texto": pc.textoBusqueda}, successCallback, errorCallback);

    };

    pc.update = function (evento) {

        var successCallback = function (data, responseHeaders) {
            $log.info('updating successfuly ' + data);

        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while persisting');
        };

        eventosResource.update(evento, successCallback, errorCallback)

    };


    pc.open = function (evento) {

        pc.evento = evento;

        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: './app/public/eventos/modal.html',
            size: 'sm',
            controllerAs: pc,
            controller: function ($scope, $uibModalInstance) {

                $scope.evento = pc.evento;
                $scope.descrip = $scope.evento.descripcion;
                $scope.actualizar = function (descrip) {

                    $scope.evento.descripcion = descrip;
                    var successCallback = function (data, responseHeaders) {
                        $log.info('updating successfuly ' + data);

                    };

                    var errorCallback = function (responseHeaders) {
                        $log.error('error while persisting');
                    };

                    eventosResource.update($scope.evento, successCallback, errorCallback)

                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cerrar = function () {

                    $uibModalInstance.dismiss('cancel');
                };


            }
        });
    };

    pc.openLugar = function () {


        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: './app/public/eventos/newLugar.html',
            size: 'sm',
            controllerAs: pc,
            controller: function ($scope, $uibModalInstance) {

                $scope.lugar = {};

                $scope.guardar = function () {

                    var successCallback = function (data, responseHeaders) {
                        $log.info('save successfuly ' + data);
                        pc.searchLugares();

                    };

                    var errorCallback = function (responseHeaders) {
                        $log.error('error while persisting');
                    };

                    lugaresResource.save($scope.lugar, successCallback, errorCallback);

                    $scope.cerrar();
                };

                $scope.cerrar = function () {

                    $uibModalInstance.dismiss('cancel');
                };


            }
        });


    };

    pc.searchLugares();


});


module.controller('newEventosController', function ($scope, $log, $location, eventosResource, lugaresResource, lugaresByNombreResource) {
    $scope.location = $location.path();
    $scope.eventos = {};
    $scope.lugares = [];
    $scope.lugar = {};

    $scope.save = function () {

        var successCallback = function (data, responseHeaders) {

            $log.info('data: ' + data);
            if (data == '') {
                $log.info('no encontro la lugar ' + data);

                var successCallback = function (data, responseHeaders) {
                    $log.info('se guardo la lugar' + data);
                    $scope.lugar = data;

                    $scope.saveEvento();

                };

                var errorCallback = function (responseHeaders) {
                    $log.error('error while persisting');
                };

                lugaresResource.save($scope.lugar, successCallback, errorCallback);
            } else {
                
                $scope.cats = data;
                
                $scope.lugar = $scope.cats[0];

                $log.info('$scope.lugar.nombre' + $scope.lugar.id);
                $log.info('$scope.lugar.nombre' + $scope.lugar.nombre);
                
                $scope.saveEvento();

            }

        };

        var errorCallback = function (responseHeaders) {

            $log.error('error while persisting');
        };

        lugaresByNombreResource.queryByNombre({"nombre": $scope.lugar.nombre}, successCallback, errorCallback);

    };


    $scope.saveEvento = function () {

        var successCallback = function (data, responseHeaders) {
            $log.info('saved evento successfuly ' + data);
            $location.path('/eventos');
        };

        var errorCallback = function (responseHeaders) {
            $log.error('error while persisting');
        };

        $scope.eventos.idLugar = $scope.lugar.id;
        $scope.eventos.lugar = $scope.lugar.nombre;

        eventosResource.save($scope.eventos, successCallback, errorCallback);




    }

    $scope.cancel = function () {
        $location.path('/eventos');
    };


    $scope.searchLugares = function () {

        $log.info('Busca todas las lugares');

        var successCallback = function (data, responseHeaders) {
            $scope.lugares = data;
        };

        var errorCallback = function (responseHeaders) {
            $log.info('search error ' + responseHeaders);
        };

        lugaresResource.queryAll(successCallback, errorCallback);
    };


    $scope.isOpen = false;

    $scope.openCalendar = function (e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };

    $scope.searchLugares();

});