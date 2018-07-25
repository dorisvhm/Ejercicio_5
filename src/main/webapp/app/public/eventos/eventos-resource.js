var module = angular.module('mpApp.public');


module.factory('eventosResource', function ($resource, comm) {
    return $resource(comm.url + '/eventos', {
          
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

module.factory('lugaresResource', function ($resource, comm) {
    return $resource(comm.url + '/lugares', {
          
        }, {
        'queryAll': {
            method: 'GET',
            isArray: true
        }
    });
});

module.factory('lugaresByNombreResource', function ($resource, comm) {
    return $resource(comm.url + '/lugares/lugar', {
          
        }, {
        'queryByNombre': {
            method: 'GET',
            isArray: true
        }
    });
});


module.factory('searchByTextoResource', function ($resource, comm) {
    return $resource(comm.url + '/eventos/texto', {
          
        }, {        
        'queryByTexto': {
            method: 'GET',
            isArray: true
        }
    });
});

module.factory('searchByLugarResource', function ($resource, comm) {
    return $resource(comm.url + '/eventos/lugar', {
          
        }, {        
        'queryByLugar': {
            method: 'GET',
            isArray: true
        }
    });
});