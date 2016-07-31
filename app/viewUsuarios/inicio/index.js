'use strict';

angular.module('justineApp.usuarios.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios/panel', {
    templateUrl: 'viewUsuarios/inicio/index.html',
    controller: 'UsuariosInicioController',
    controllerAs: '$ctrl'
  });
}])
.controller('UsuariosInicioController', ['$http', function($http) {
    var ctrl = this;

    /* La lista de usuarios */
    ctrl.corpus = {};

    /* La lista de grupos a enviar a los formularios de edición de usuarios */
    ctrl.listadogrupos = {};
    
    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http({method: 'GET', url: '/api/helpers_grupos.json'}).
       then(function(respuesta){
            ctrl.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema con el servidor en este punto");
    });
    
    /* Una listado de usuarios con datos ligeros es la forma en que creamos la tabla con elementos fila-panel  */
    $http({method: 'GET', url: '/api/usuario_listado.json'}).
        then(function(respuesta){
            ctrl.corpus = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema con el servidor en este punto");
        });

    /* Operación borrado sube hasta este punto para asegurar que la entrada será borrada en tiempo real de la lista 
     * El nombre dado al parámetro ("entrada") debe ser usado cuando se pase esta función en binding al siguiente componente
     *
     * */
    ctrl.borrarEntradaListado = function(entrada){
        console.log("Llegamos tan arriba borrando");
        console.log(entrada);
        var indice = ctrl.corpus.indexOf(entrada)
        if (indice >= 0){
            ctrl.corpus.splice(indice, 1);
        };
    };

    /* Operación edición sube a este punto para que los cambios hechos sean accesibles a otros componentes que usan la información del usuario
     * que tomó de la lista o de la que se corresponde con detalleUsuario  
     *
     * */
    ctrl.editarEntradaListado = function(detalle){
        console.log("Llegamos tan arriba editando");
        console.log(detalle);
        var indice = ctrl.corpus.indexOf(detalle)
        if (indice >=0){
            ctrl.corpus[indice] = detalle;
        };
    };
}]);
