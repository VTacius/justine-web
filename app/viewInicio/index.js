'use strict';

angular.module('myApp.inicio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inicio', {
    templateUrl: 'viewInicio/inicio.html',
    controller: 'InicioController',
    controllerAs: 'InicioCtrl'
  });
}])

.controller('InicioController', ['$scope', function($scope){
}]);
