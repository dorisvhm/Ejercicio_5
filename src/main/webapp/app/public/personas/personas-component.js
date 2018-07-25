
var module = angular.module('mpApp.public');

module.component('personasComponent', {
    templateUrl: 'app/public/personas/search.html',
    bindings: {
        view: "@"
    },
    controller: function ($log, $q, personasResource) {

        this.textoBusqueda = "";
        this.personas = [];

        //  Promise chaining
        this.searchByTexto = function () {


            var allPersonas = $q.all([

                //$http.get(comm.url + '/personas'),
                personasResource.queryAll({"max": 100}).$promise
            ]);

            allPersonas.then(function (values) {
                this.personas = values;

                $log.info('personas done');
            });
        };

        this.search = function () {


            
        };

    }
});

module.component('nuevaPersonaComponent', {
    templateUrl: 'app/public/personas/detail.html',
    bindings: {
        view: "@"
    },
    controller: function () {

      

    }
    
    
    
});
