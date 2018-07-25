
var module = angular.module('mpApp.public', ['mpApp.ui', 'ui.router', 'ngResource']);

module.constant('comm', {
    url: '/proyectoFinal/rest'
});

module.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('public', {
        abstract: true,
        data: {
            title: 'MP Enterprise',            
        }
        
    });


    $stateProvider.state('public.eventos', {
        url: '/eventos',
        data: {
            title: 'Eventos'
        },
        views: {
            "root@app": {
                templateUrl: 'app/public/eventos/search.html',
                controller: 'searchEventosController'
            }
        },
        resolve: {
            searchPostFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load(['app/public/eventos/eventos-controller.js',
                    'app/public/eventos/eventos-resource.js']);
            }
        },
    });

    $stateProvider.state('public.eventos.new', {
        url: '/new',
        views: {
            "root@app": {
                templateUrl: 'app/public/eventos/detail.html',
                controller: 'newEventosController'
            }
        }

    });
    

    $stateProvider.state('public.eventos.search.texto', {
        url: '/search/:texto'
    });


    $stateProvider.state('public.eventos.search.texto', {
        url: '/search/:texto',
        views: {
            "root@app": {
                templateUrl: 'app/public/eventos/search.html',
                controller: 'searchEventosController'
            }
        }

    });
    
    $stateProvider.state('public.personas',{
            url: '/personas',
            data:{
                title: 'Personas'
            },
            component: 'personasComponent',
            lazyLoad: function ($transition$) {
                    return $transition$.injector().get('$ocLazyLoad').load(['app/public/personas/personas-component.js',
                    'app/public/personas/personas-resource.js',]);
            }
        });
        
        $stateProvider.state('public.nuevoEvento',{
            url: '/nuevoEvento',
            data:{
                title: 'Persona'
            },
            component: 'nuevaPersonaComponent',
            lazyLoad: function ($transition$) {
                    return $transition$.injector().get('$ocLazyLoad').load(['app/public/personas/nueva-persona-components.js',
                    'app/public/personas/personas-resource.js',]);
            }
        });


});
