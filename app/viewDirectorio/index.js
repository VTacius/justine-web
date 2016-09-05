'use strict';

angular.module('justineApp.directorio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/directorio', {
    templateUrl: 'viewDirectorio/index.html',
    controller: 'DirectorioController',
    controllerAs: '$ctrl',
  });
}])
.controller('DirectorioController', ['$http', '__ENV', function($http, __ENV){
    var ctrl = this;
    
    /* El listado de usuarios */
    ctrl.corpus = []; 
    
    /* TODO: No me gusta del todo lo que estoy emulando, pero así podré mantener el estado del buscador 
     * y evitar la búsqueda innecesaria que podría ocasionar el retroceso */
    ctrl.longitudBusqueda = 0;
    
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
    $http.get(__ENV['api']['usuarios']['listado']).
        then(function(respuesta){
            ctrl.corpus = respuesta.data;
        }, function(response){
            console.log(ctrl.corpus);
        });
}]);
