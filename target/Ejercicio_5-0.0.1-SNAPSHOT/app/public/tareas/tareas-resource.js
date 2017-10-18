var module = angular.module('mpApp.public');


module.factory('tareasResource', function ($resource, comm) {
    return $resource(comm.url + '/tareas', {
            
        }, {
        'queryAll': {
            method: 'GET',
            isArray: true
        },
        'query' : {
                method : 'GET',
                isArray : false
        },
        'update' : {
            method : 'PUT'
        }
    });
});

