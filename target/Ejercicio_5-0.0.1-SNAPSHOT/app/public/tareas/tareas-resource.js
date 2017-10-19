var module = angular.module('mpApp.public');


module.factory('tareasResource', function ($resource, comm) {
    return $resource(comm.url + '/tareas', {
          
        }, {
        'queryAll': {
            method: 'GET',
            isArray: true
        },
        'update' : {
            method : 'PUT'
        },
        'queryByCategoria': {
            method: 'GET',
            isArray: true
        },
        'queryByTexto': {
            method: 'GET',
            isArray: true
        }
    });
});

