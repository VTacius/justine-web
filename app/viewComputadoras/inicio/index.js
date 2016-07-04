'use strict';

angular.module('justineApp.computadoras.inicio', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/computadoras/', {
    templateUrl: 'viewComputadoras/inicio/index.html',
    controller: 'ComputadorasInicioController',
    controllerAs: 'ComputadorasInicioCtrl'
  });
}])
.controller('ComputadorasInicioController', ['$scope', '$http', function($scope, $http) {
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
