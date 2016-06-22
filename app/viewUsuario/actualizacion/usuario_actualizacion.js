'use strict';

angular.module('myApp.usuario.actualizacion', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuario/actualizacion', {
    templateUrl: 'viewUsuario/actualizacion/usuario_actualizacion.html',
    controller: 'ViewUsuarioActualizacionCtrl'
  });
}])

.controller('ViewUsuarioActualizacionCtrl', [function() {

}]);
