'use strict';

angular.module('justineApp.usuarios.creacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) { 
    $routeProvider.when('/usuarios/creacion/', {
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
    $http({method: 'GET', url: __ENV['api']['grupos']['listado']}).
       then(function(respuesta){
            ctrl.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema con el servidor en este punto");
        });

    /*Este es un objeto falso con tal que no joda */
    ctrl.usuario = {};

    /* Datos de la cuenta por defecto */
    ctrl.usuarioDetalle = {
        'grupo': 513,
        'volumenBuzon': 300,
        'sambaAcctFlags': false,
        'buzonStatus': false,
        'loginShell': 'false',
        'cuentaStatus': false,
        'jvs':{
            'estado': false,
            'valor': null
        },
    };
    
    /* Esto se corresponde con la funcionalidad de los componentes */

    /* La funcionalidad asociada con submit del formulario */
    ctrl.creacion = function(usuario, usuarioDetalle){
        var objetoCambio = angular.merge({}, usuario, usuarioDetalle);
        console.log(objetoCambio);
        
        $http.post(__ENV['api']['usuarios']['creacion'], {'corpus': objetoCambio}).
            then(function(respuesta){ 
                /* Acá deberíamos tratar con nuestro sistema de mensajes para el usuario
                   Es encantador lo sencillo que debería ser
                */
                ctrl.mensajes = respuesta.data;
                console.log(respuesta.data);
                console.log(respuesta);
            }, function(respuesta){
                console.log('Hay un problema con el servidor en este punto');
            });
    }
}]);
