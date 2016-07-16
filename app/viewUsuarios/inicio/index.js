'use strict';

angular.module('justineApp.usuarios.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios/', {
    templateUrl: 'viewUsuarios/inicio/index.html',
    controller: 'UsuariosInicioController',
    controllerAs: 'UsuariosInicioCtrl'
  });
}])
.controller('UsuariosInicioController', ['$scope', '$http', function($scope, $http) {

    $scope.corpus = {};
    $scope.listadogrupos = {};
    
    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http({method: 'GET', url: '/api/helpers_grupos.json'}).
       then(function(respuesta){
            $scope.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema en este punto");
            console.log(respuesta);
    });
    
    /* El listado de usuarios existentes es parte del controlador que pertenece a UsuariosInicioCtrl */
    $http({method: 'GET', url: '/api/listado_usuario.json'}).
        then(function(respuesta){
            $scope.corpus = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema en este punto");
            console.log(respuesta);
        });
        
    $scope.borrarEntradaListado = function(detalle){
        console.log("Estamos por borrar a alguien de la lista");
        var indice = $scope.corpus.indexOf(detalle)
        if (indice >= 0){
            $scope.corpus.splice(indice, 1);
        }
    };
}]);
