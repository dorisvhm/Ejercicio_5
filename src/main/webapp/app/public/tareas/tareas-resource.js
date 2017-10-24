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
        }
    });
});


module.factory('searchByTextoResource', function ($resource, comm) {
    return $resource(comm.url + '/tareas/texto', {
          
        }, {        
        'queryByTexto': {
            method: 'GET',
            isArray: true
        }
    });
});

module.factory('searchByCategoriaResource', function ($resource, comm) {
    return $resource(comm.url + '/tareas/categoria', {
          
        }, {        
        'queryByCategoria': {
            method: 'GET',
            isArray: true
        }
    });
});