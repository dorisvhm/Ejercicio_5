
var module = angular.module('mpApp.public', ['mpApp.ui', 'ui.router', 'ngResource']);

module.constant('comm', {
    url: '/Ejercicio_5/rest'
});

module.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('public', {
        abstract: true,
        data: {
            title: 'MP Enterprise'
        }
    });


    $stateProvider.state('public.tareas', {
        url: '/tareas',
        data: {
            title: 'Tareas'
        },
        views: {
            "root@app": {
                templateUrl: 'app/public/tareas/search.html',
                controller: 'searchTareasController'
            }
        },
        resolve: {
            searchPostFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load(['app/public/tareas/tareas-controller.js',
                    'app/public/tareas/tareas-resource.js']);
            }
        },
    });

    $stateProvider.state('public.tareas.new', {
        url: '/new',
        views: {
            "root@app": {
                templateUrl: 'app/public/tareas/detail.html',
                controller: 'newTareasController'
            }
        }

    });

    $stateProvider.state('public.tareas.search.texto', {
        url: '/search/:texto'
    });


    $stateProvider.state('public.tareas.search.texto', {
        url: '/search/:texto',
        views: {
            "root@app": {
                templateUrl: 'app/public/tareas/search.html',
                controller: 'searchTareasController'
            }
        }

    });


});
