var module = angular.module('mpApp.public');


module.factory('personasResource', function ($resource, comm) {
    return $resource(comm.url + '/personas', {
          
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

module.factory('personasByTextoResource', function ($resource, comm) {
    return $resource(comm.url + '/personas/personaTexto', {
          
        }, {        
        'queryByTexto': {
            method: 'GET',
            isArray: true
        }
    });
});
