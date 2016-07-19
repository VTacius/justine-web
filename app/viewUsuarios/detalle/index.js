'use strict';

angular.module('justineApp').
component('detalleUsuarios', {
    templateUrl: 'viewUsuarios/detalle/index.html',
    controller: function(){

        var ctrl = this;
        
    },
    bindings: {
        usuario: '<',
        usuarioDetalle: '<',
        grupos: '<'
    }
    
});
