'use strict';

angular.module('justineApp').
component('detalleUsuarios', {
    templateUrl: 'viewUsuarios/detalle/index.html',
    controller: function(){

        var ctrl = this;
        console.log(ctrl.usuario); 
        /* TODO: Sigo presentando mal los datos, hay que trabajar esta parte */
        ctrl.grupoUsuarios = ctrl.usuarioDetalle.grupo;
        ctrl.gruposUsuarios = ctrl.usuarioDetalle.grupos;
        
    },
    bindings: {
        usuario: '<',
        usuarioDetalle: '<',
        grupos: '<'
    }
    
});
