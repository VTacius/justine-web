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

    $http({method: 'GET', url: '/api/helpers_grupos.json'}).
       then(function(respuesta){
            $scope.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema en este punto");
            console.log(respuesta);
    });

    $http({method: 'GET', url: '/api/listado_usuario.json'}).
        then(function(respuesta){
            $scope.corpus = respuesta.data.data;
        }, function(respuesta){
            console.log("Hay un problema en este punto");
            console.log(respuesta);
        });
}]);
