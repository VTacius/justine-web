'use strict';

angular.module('justineApp.usuarios.creacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios/creacion/', {
    templateUrl: 'viewUsuarios/creacion/index.html',
    controller: 'UsuariosCreacionController',
    controllerAs: '$ctrl'
  });
}])
.controller('UsuariosCreacionController', ['$http', function($http) {
    var ctrl = this;
}]);
