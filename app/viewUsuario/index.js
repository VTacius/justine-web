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
    ctrl.usuarioDetalle = {};

    $http({url: '/api/usuario_actualizacion.json', method: 'GET'}).then(
        function(respuesta){
            /* Basta con una petición, pero mantenemos las entradas que el formulario requiere */
            ctrl.usuario = ctrl.usuarioDetalle = respuesta.data.data;
        }, function(respuesta){
            console.log("Algo mu malo ha pasado, por ejemplo, yo soy una vaca");
        });

    /* La funcionlidad que enviamos como acción a realizar por parte del formulario */
    ctrl.actualizacion = function(corpus, corpusDetalle){
        /* Como el usuario nos envía los datos actualizados, hay que considerar ambos objetos como en otras creación y edicion */
        console.log("Estoy desde el padre actualización de datos");
        console.log(corpus);
        console.log(corpusDetalle);
        var objetoCambio = angular.merge({}, corpus, corpusDetalle);
        console.log(objetoCambio);
    };
    
}]);
