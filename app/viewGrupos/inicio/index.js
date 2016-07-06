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
}]);
