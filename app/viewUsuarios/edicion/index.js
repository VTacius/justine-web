'use strict';

angular.module('justineApp').
component('edicionUsuarios', {
    templateUrl: 'viewUsuarios/edicion/index.html',
    controller: function($http){

        var ctrl = this;

        ctrl.corpus = {};
        ctrl.usuario = {};
       
        /*Contructor, dicho mal y rápido por poner comentario */
        ctrl.$onInit = function(){
        
            /* Obtenemos los datos del usuario a modificar */
            $http({method: 'GET', url: '/api/detalle_usuario_modificacion.json'}).
                then(function(respuesta){
                    ctrl.corpus = respuesta.data.data;
                    ctrl.usuario = angular.copy(ctrl.corpus);
                },function(respuesta){
                    console.log("Ha ocurrido un error, creo recordar");
                });
            
            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http({method: 'GET', url: '/api/establecimientos.json'}).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    console.log("Acá pasó un error en el servidor, más que nada");
                });
        };
        
        /* La funcionalidad en ng-submit de button enviar */
        ctrl.enviar = function(corpus){
            console.log(corpus);
        };
        
        /* La funcionalidad en ng-click en button cancelar */
        ctrl.reiniciar = function(){
            ctrl.formularioEdicionUsuarios.$setUntouched();
            ctrl.corpus = angular.copy($scope.usuario);
        };
        
        /* Un callaback a angucomplete-alt de establecimiento */
        ctrl.seleccionaEstablecimiento = function(seleccionado){
            if (seleccionado){
                ctrl.corpus.o = seleccionado.originalObject;
                $http({method: 'GET', url: '/api/oficinas.json'}).
                    then(function(respuesta){
                        console.log("Vamos a llenar oficinas, eso es seguro");
                        ctrl.oficinas = respuesta.data;
                    }, function(respuesta){
                        console.log("Algo malo pasó en este momento");
                    });
            };
        };

        /* Un callaback a angucomplete-alt de oficina */
        ctrl.seleccionaOficina = function(seleccionado){
            if (seleccionado){
                ctrl.corpus.ou = seleccionado.originalObject;
            };
        }; 

            
    },
    bindings: {
        uid: '<'
    }

});
