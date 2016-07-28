'use strict';

angular.module('justineApp.usuarios.creacion', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) { $routeProvider.when('/usuarios/creacion/', {
    templateUrl: 'viewUsuarios/creacion/index.html',
    controller: 'UsuariosCreacionController',
    controllerAs: '$ctrl'
  });
}])
.controller('UsuariosCreacionController', ['$http', function($http) {
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

    /* Estos son datos que quiero que la cuenta tenga por defecto */
    ctrl.usuario = {
        "sambaAcctFlags": {
            "estado": false,
            "off": "Bloqueada",
            "on": "Activa"
        },
        "buzonStatus": {
            "estado": false,
            "off": "Bloqueada",
            "on": "Activa"
        },
        "cuentaStatus":{
            "estado": false,
            "off": "Cerrada",
            "on": "Activa"
        },
        "jvs":{
            "estado": true,
            "on": "No Aplica",
            "off": "Aplica",
            "valor": "123465789"
        },
    }
    
    /* Esto se corresponde con la funcionalidad de los componentes */

    /* La funcionalidad asociada con submit del formulario */
    ctrl.creacion = function(usuario){
        console.log("Estoy en el controlador Padre, vista pues");
        console.log(usuario);
    }

}]);
