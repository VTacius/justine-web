'use strict';

angular.module('justineApp.usuarios.creacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) { $routeProvider.when('/usuarios/creacion/', {
    templateUrl: 'viewUsuarios/creacion/index.html',
    controller: 'UsuariosCreacionController',
    controllerAs: '$ctrl'
  });
}])
.controller('UsuariosCreacionController', ['$http', '__ENV', function($http, __ENV) {
    var ctrl = this;
   
    /* Enviamos el formulario los datos que algunos componente requieren para mostrar datos */ 
    ctrl.listadogrupos = [];
    
    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http({method: 'GET', url: '/api/helpers_grupos.json'}).
       then(function(respuesta){
            ctrl.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema con el servidor en este punto");
        });

    /*Este es un objeto falso con tal que no joda */
    ctrl.usuario = {};

    /* Estos son datos que quiero que la cuenta tenga por defecto */
    ctrl.usuarioDetalle = {
        "sambaAcctFlags": false,
        "buzonStatus": false,
        "cuentaStatus": false,
        "jvs":{
            "estado": false,
            "valor": null
        },
    }
    
    /* Esto se corresponde con la funcionalidad de los componentes */

    /* La funcionalidad asociada con submit del formulario */
    ctrl.creacion = function(usuario, usuarioDetalle){
        console.log("Estoy en el controlador Padre, vista creacion pues");
        console.log(usuario);
        console.log(usuarioDetalle);
        var objetoCambio = angular.merge({}, usuario, usuarioDetalle);
        console.log(objetoCambio);
        $http.post(__ENV['api']['postUsuarios'], {'corpus': objetoCambio}).
            then(function(respuesta){ 
                /* Acá deberíamos tratar con nuestro sistema de mensajes para el usuario
                    Es encantador lo sencillo que debería ser
                */
                ctrl.mensajes = respuesta.data;
                console.log('Hemos tenido una milagrosa creación de usuario');
                console.log(respuesta);
            }, function(respuesta){
                console.log(respuesta);
                console.log('Hay un problema con el servidor en este punto');
            });
        }
}]);
