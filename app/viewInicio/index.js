'use strict';

angular.module('justineApp.inicio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inicio', {
    templateUrl: 'viewInicio/index.html',
    controller: 'InicioController',
    controllerAs: 'InicioCtrl'
  });
}])

.controller('InicioController', ['$scope', function($scope){
}]);
