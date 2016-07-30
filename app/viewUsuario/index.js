'use strict';

angular.module('justineApp.usuario.actualizacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuario/actualizacion', {
    templateUrl: 'viewUsuario/index.html',
    controller: 'usuarioController',
    controllerAs: '$ctrl'
  });
}])
.controller('usuarioController', ['$http', function($http) {
    
    var ctrl = this;

    ctrl.usuario = {};

    $http({url: '/api/usuario_actualizacion.json', method: 'GET'}).then(
        function(respuesta){
            ctrl.usuario = respuesta.data.data;
        }, function(respuesta){
            console.log("Algo mu malo ha pasado, por ejemplo, yo soy una vaca");
        });

    /* La funcionlidad que enviamos como acción a realizar por parte del formulario */
    ctrl.actualizacion = function(corpus){
        console.log("Estoy desde el padre actualización de datos");
        console.log(corpus);
    };
    
}]);
