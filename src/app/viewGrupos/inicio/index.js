'use strict'; 

angular.module('justineApp.grupos.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/grupos/panel', {
        data: {
            roles: ['administrador', 'tecnicosuperior']
        },
        templateUrl: 'viewGrupos/inicio/index.html',
        controller: 'GruposInicioController',
        controllerAs: '$ctrl'
    });
}]).
controller('GruposInicioController', ['$http', '__ENV', 'tituladorService', function($http, __ENV, tituladorService) {
    var ctrl = this;
    
    /* Disponemos del mensaje de alerta en este controlador */
    ctrl.alerta = {};
    
    /* Cambio el titulo de nuestra página */
    tituladorService('Administración de Grupos');

    /* La lista de grupos */
    ctrl.corpus = [];
    
    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http.get(__ENV['api']['grupos']['listado']).
        then(function(respuesta){
            ctrl.corpus = respuesta.data;
        }, function(respuesta){
            console.log(respuesta);
            ctrl.alerta.titulo = 'Error obteniendo listado de grupos';
            ctrl.alerta.mensaje = null;
            ctrl.alerta.codigo = respuesta.status;
            ctrl.alerta.tipo = 'error';
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

    /* Operación edición sube a este punto para que los cambios hechos sean accesibles a otros componentes que usan la información del grupo
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
