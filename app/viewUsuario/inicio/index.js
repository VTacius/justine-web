'use strict';

angular.module('justineApp.usuario.inicio', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios/', {
    templateUrl: 'viewUsuario/inicio/index.html',
    controller: 'UsuarioInicioController',
    controllerAs: 'UsuarioInicioCtrl'
  });
}])
.controller('UsuarioInicioController', ['$scope', '$http', function($scope, $http) {
    $scope.corpus = "";
    $scope.fetch = function(){
        $http({method: 'GET', url: '/api/listado_usuario.json'}).
        then(function(respuesta){
                $scope.corpus=respuesta.data.data;
            }, function(respuesta){
                console.log(respuesta);
            });
        };
}]);