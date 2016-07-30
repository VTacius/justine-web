'use strict';

angular.module('justineApp.usuario.actualizacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuario/actualizacion', {
    templateUrl: 'viewUsuario/index.html',
    controller: 'usuarioController',
    controlleras: '$ctrl'
  });
}])
.controller('usuarioController', ['$http', function($http) {
}]);
