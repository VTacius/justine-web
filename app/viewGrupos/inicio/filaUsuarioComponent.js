'use strict';

angular.module('justineApp').
component('filaUsuarioComponent', {
    templateUrl: 'viewGrupos/inicio/filaUsuarioComponent.html',
    bindings: {
        usuario: '<', 
    },
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.muestraDetalle = false;
        ctrl.mostrarDetalle = function(){
            ctrl.muestraDetalle = true;
        }; 
        ctrl.ocultarDetalle = function(){
            ctrl.muestraDetalle = false;
        };
    }
});
