'use strict';

angular.module('justineApp.grupos.inicio', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grupos/', {
    templateUrl: 'viewGrupos/inicio/index.html',
    controller: 'GruposInicioController',
    controllerAs: 'GruposInicioCtrl'
  });
}])
.controller('GruposInicioController', ['$scope', '$http', function($scope, $http) {
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
