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

    /*
     * Se considera que este método no esta optimizado, por tanto, ante cualquier 
     * duda sobre el rendimiento debe considerársele responsable
     * */
    var busquedaItem = function(arreglo, valor){
        for (var i = 0; i < arreglo.length; i++){
            if (arreglo[i].uid === valor){
                return true;
                break;
            };
        };
    };

    /*
     * La idea, por este momento, es que la búsqueda sea independiente del número de registros que se muestran
     * La búsqueda ocurre cada dos letras, y cuidamos que no ocurra cuando el usuario va en retroceso
     *
     *
     * */
    ctrl.llenaListado = function(contenido){
        if (contenido.length >= ctrl.longitudBusqueda && contenido.length > 2 && (contenido.length % 2) === 0){
            /* Recuerda que será a contenido lo que envíes como búsqueda */
            $http({method: 'GET', url: '/api/usuario_listado_beta.json'}).
                then(function(respuesta){
                    angular.forEach(respuesta.data, function(item){
                        /* No creo que incumpla la regla de que justine-web debería encargarse de mostrar datos
                         * sin tener que manipularlos, porque tampoco no podemos suponer que el backend tenga plena
                         * conciencia de lo que estoy haciendo en este punto
                         * */
                        if (!busquedaItem(ctrl.corpus, item.uid)){
                            /* No pos, creo que a esta altura ya queda claro que puedo entrar */
                            ctrl.corpus.push(item);
                        };
                    }); 
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
