'use strict';

angular.module('myApp.usuario.actualizacion', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuario/actualizacion', {
    templateUrl: 'viewUsuario/actualizacion/index.html',
    controller: 'UsuarioActualizacionController',
    controllerAs: 'UsuarioActualizacionCtrl'
  });
}])

.controller('UsuarioActualizacionController', [function() {

}]);
