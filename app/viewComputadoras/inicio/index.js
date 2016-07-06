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
}]);
