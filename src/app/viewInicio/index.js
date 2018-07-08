'use strict';

angular.module('justineApp.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/inicio', {
        data: {
            roles: ['administrador', 'tecnicosuperior']
        },
        templateUrl: 'viewInicio/index.html',
        controller: 'InicioController',
        controllerAs: '$ctrl'
  });
}]).
controller('InicioController', ['__ENV', '$http', function(__ENV, $http){
    var ctrl = this;
    ctrl.titulo = __ENV.titulo;

    ctrl.establecimientos = [];

    ctrl.textoBusqueda = 'CRN Concepción Batres US Montefresco';
    
    $http({url: '/api/helpers_establecimientos.json', method: 'GET'}).then(
        function(respuesta) {
            ctrl.establecimientos = respuesta.data;
        }, function(respuesta){
            console.log('Algo pasó a la hora de consultar a la base de datos');
        });

    ctrl.busquedaEstablecimiento = function(busqueda){
        var respuesta = []
        angular.forEach(ctrl.establecimientos, function(establecimiento){
            if (establecimiento.nombre.indexOf(busqueda) >= 0){
                console.log(establecimiento.nombre.indexOf(busqueda));
                respuesta.push(establecimiento);
            }
        });
        return respuesta;
    };

    ctrl.cambioItem = function(item){
        console.log(item);
    };
}])
;
