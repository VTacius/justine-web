'use strict';

angular.module('componentes.switch', []).
component('jtSwitch', {
    templateUrl: 'components/jt-switch/index.html',
    controller: function(){ 
        var ctrl = this;
        
        ctrl.onTexto = ctrl.onTexto ? ctrl.onTexto : "Activo";
        ctrl.offTexto = ctrl.offTexto ? ctrl.offTexto : "Inactivo";
    },
    bindings: {
        onTexto: '<',
        offTexto: '<'
    }
});
