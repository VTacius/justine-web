'use strict';

angular.module('justineApp.grupos.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grupos/panel', {
    templateUrl: 'viewGrupos/inicio/index.html',
    controller: 'gruposInicioController',
    controllerAs: '$ctrl'
  });
}])
.controller('gruposInicioController', ['$http', function($http) {
    var ctrl = this;

    console.log("Ya somos grupos");

    /* La lista de grupos */
    ctrl.corpus = {};

    
    /* Una listado de grupos con datos ligeros es la forma en que creamos la tabla con elementos fila-panel  */
    $http({method: 'GET', url: '/api/grupos_listado.json'}).
        then(function(respuesta){
            ctrl.corpus = respuesta.data;
            console.log(ctrl.corpus);
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
