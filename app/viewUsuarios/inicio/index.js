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
    ctrl.corpus = [];

    /* La lista de grupos a enviar a los formularios de edición de usuarios */
    ctrl.listadogrupos = [];

    /* No me gusta del todo lo que estoy emulando, pero así podré mantener el estado del buscador 
     * y evitar la búsqueda innecesaria que podría ocasionar el retroceso */
    ctrl.longitudBusqueda = 0;

    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http({method: 'GET', url: '/api/helpers_grupos.json'}).
       then(function(respuesta){
            ctrl.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema con el servidor en este punto");
    });

    /* Empieza el trabajo para llenar el listado bajo demanda */
    /* Parece que al final no es dentro del filtro que eso va a a suceder alguna vez, aunque debo decir que este no es tan mala idea,
     * así podré mantener el modelo una vez vaya hacía atrás */
    ctrl.llenaListado = function(contenido){
        console.log("Estamos cambiando");
        if (contenido.length >= ctrl.longitudBusqueda && contenido.length > 2 && (contenido.length % 2) === 0){
            console.log("Creo que puedo aumentar un poco eso");
            $http({method: 'GET', url: '/api/usuario_listado_beta.json'}).
                then(function(respuesta){
                    console.log(respuesta.data);
                    /* De esos momentos donde AngularJS se hace tan melindroso */
                    var remoto = [].concat(ctrl.corpus, respuesta.data);
                    ctrl.corpus = remoto;
                }, function(respuesta){
                    console.log("Hay un problema con el servidor en este punto");
                });
        };
        ctrl.longitudBusqueda = angular.copy(contenido.length);
    };
    
    /* Una listado de usuarios con datos ligeros es la forma en que creamos la tabla con elementos fila-panel  */
    $http({method: 'GET', url: '/api/usuario_listado_alfa.json'}).
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
