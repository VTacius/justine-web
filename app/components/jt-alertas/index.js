'use strict';

angular.module('justineApp').
component('jtAlerta', {
    templateUrl: 'components/jt-alertas/index.html',
    controller: function(){
        var ctrl = this;
        
        ctrl.cerrar = function(){
            ctrl.mostrar = false;
        };

        ctrl.$onChanges = function(){
            ctrl.mostrar = ctrl.cerrado;
            console.log(ctrl.cerrado);
            console.log("Estoy por cerrar");
        };
    },
    bindings: {
       tipo: '<',
       titulo: '<',
       mensaje: '<',
       codigo: '<',
       cerrado: '<'
    }
});
