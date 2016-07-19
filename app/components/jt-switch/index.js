'use strict';

angular.module('componentes.switch', []).
component('jtSwitch', {
    templateUrl: 'components/jt-switch/index.html',
    controller: function(){ 
        var ctrl = this;

        ctrl.valor = ctrl.buzon.estado;
        ctrl.onTexto = 'onTexto' in ctrl.buzon ? ctrl.buzon.onTexto : "Activo";
        ctrl.offTexto = ctrl.buzon.offTexto ? ctrl.buzon.offTexto : "Inactivo";
        
        ctrl.retornaValor = function(){
            ctrl.actualiza({'estado': ctrl.valor});
        };
    },
    bindings: {
        buzon: '<',
        actualiza: '&'
    }
});
