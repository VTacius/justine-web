'use strict';

angular.module('justineApp.usuarios.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios/panel', {
    templateUrl: 'viewUsuarios/inicio/index.html',
    controller: 'UsuariosInicioController',
    controllerAs: '$ctrl'
  });
}])
.controller('UsuariosInicioController', ['$http', '__ENV', function($http, __ENV) {
    var ctrl = this;

    /* La lista de usuarios */
    ctrl.corpus = [];

    /* La lista de grupos a enviar a los formularios de edición de usuarios */
    ctrl.listadogrupos = [];

    /* TODO: No me gusta del todo lo que estoy emulando, pero así podré mantener el estado del buscador 
     * y evitar la búsqueda innecesaria que podría ocasionar el retroceso */
    ctrl.longitudBusqueda = 0;

    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http.get(__ENV['api']['grupos']['listado']).
       then(function(respuesta){
            ctrl.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log(respuesta);
            ctrl.alerta.titulo = 'Error obteniendo listado de usuarios';
            ctrl.alerta.mensaje = null;
            ctrl.alerta.codigo = respuesta.status;
            ctrl.alerta.tipo = 'error';
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
        /* Te cuento que no podrás ver que tan bien funciona hasta que lo hagas con datos verdaderamente reales */
        if (contenido.length >= ctrl.longitudBusqueda && contenido.length > 1 && (contenido.length % 1) === 0){
            /* Recuerda que será a contenido lo que envíes como búsqueda */
            $http.get(__ENV['api']['usuarios']['busqueda'] + contenido).
                then(function(respuesta){
                    console.log(respuesta);
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
                    console.log(respuesta);
                    ctrl.alerta.titulo = 'Error obteniendo listado de usuarios';
                    ctrl.alerta.mensaje = null;
                    ctrl.alerta.codigo = respuesta.status;
                    ctrl.alerta.tipo = 'error';
                });
        };
        ctrl.longitudBusqueda = angular.copy(contenido.length);
    };
    
    /* Una listado de usuarios con datos ligeros es la forma en que creamos la tabla con elementos fila-panel  */
    /* TODO: Este no es el mejor lugar para $http, es necesario revisar documentacion de controladores */
    $http.get(__ENV['api']['usuarios']['listado']).  
        then(function(respuesta){
            ctrl.corpus = respuesta.data;
        }, function(respuesta){
            console.log(respuesta);
            ctrl.alerta.titulo = 'Error obteniendo listado de usuarios';
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

    /* Operación edición sube a este punto para que los cambios hechos sean accesibles a otros componentes que usan la información del usuario
     * que tomó de la lista o de la que se corresponde con detalleUsuario  
     * pero la operación con la API debió realizarse más abajo
     *
     * */
    ctrl.editarEntradaListado = function(detalle){
        var indice = ctrl.corpus.indexOf(detalle)
        if (indice >=0){
            ctrl.corpus[indice] = detalle;
        };
    };
}]);
