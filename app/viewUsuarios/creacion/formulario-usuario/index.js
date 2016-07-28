'use strict';

angular.module('justineApp').

component('formularioUsuario', {
    templateUrl: 'viewUsuarios/creacion/formulario-usuario/index.html',
    controller: function ($http) {
        var ctrl = this;

        ctrl.establecimientos = [];
       
        /* Si el formulario necesita datos para mostrar datos en sus formularios, que se los consiga el componente */
        ctrl.$onInit = function(){

            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http({method: 'GET', url: '/api/helpers_establecimientos.json'}).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    console.log("Hay un problema con el servidor en este punto");
                });

            /* Obtenemos usuario desde componente padre */
            ctrl.usuario = ctrl.corpus; 
        
            /* Copiamos el modelo para resetear los valores al original */
            ctrl.usuarioOriginal = angular.copy(ctrl.usuario);
        };
        
        /* Empiezan las operaciones helpers */
        /* Usada en seleccionaEstablecimiento, entre otras cosas porque odio ver tanto identado */
        var obtenerOficinas = function(oficina){
            $http({method: 'GET', url: '/api/helpers_oficinas/' + oficina + '.json'}).
                then(function(respuesta){
                    ctrl.oficinas = respuesta.data;
                    if (!ctrl.oficinas){
                        ctrl.requerirOficina = false;
                    }
                }, function(respuesta){
                    ctrl.requerirOficina = false;
                    ctrl.oficinas = [];
                });

        };


        /* Esto se corresponde con la funcionalidad de los componentes */

        /* Hay controles que se muestran según {{Sigo sin ponerne de acuerdo sobre que lo controlará}} */
        ctrl.mostrarCampos = function(){
            return false;
        }

        /* Funcionalidad para cambiar el estado de jt-switch */
        ctrl.actualizaJtSwitch = function(modelo, estado) {
            console.log(modelo);
            ctrl.usuario[modelo]['estado'] = estado;
        }

        /* Un callback a angucomplete-alt de establecimiento */
        ctrl.seleccionaEstablecimiento = function(seleccionado){
            if (seleccionado){
                ctrl.usuario.o = seleccionado.originalObject;
                obtenerOficinas(ctrl.usuario.o.id);
            };
        };

        /* Un callaback a angucomplete-alt de oficina */
        ctrl.seleccionaOficina = function(seleccionado){
            if (seleccionado){
                ctrl.usuario.ou = seleccionado.originalObject.nombre;
            };
        };
 
        /* La funcionalidad en ng-click de button cancelar */
        ctrl.reiniciar = function(){
            ctrl.formularioUsuarios.$setUntouched();
            ctrl.usuario = angular.copy(ctrl.usuarioOriginal);
        };

        /* Funcionalidad asociada con submit del formulario, que requiere enviar los datos del formulario hacia un nivel padre */
        ctrl.enviar = function(usuario){
            console.log('Envío desde el componente que especifica al formulario');
            console.log(usuario);
            ctrl.accion({'corpus': usuario});
        }
        
    },

    bindings: {
        corpus: '<',
        accion: '&'
    }
})
