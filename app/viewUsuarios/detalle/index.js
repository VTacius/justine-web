'use strict';

angular.module('justineApp').
component('detalleUsuarios', {
    templateUrl: 'viewUsuarios/detalle/index.html',
    controller: function(){

        var ctrl = this;
        
        /* TODO: Sigo presentando mal los datos, hay que trabajar esta parte */
        ctrl.grupoUsuarios = ctrl.corpus.grupo;
        ctrl.gruposUsuarios = ctrl.corpus.grupos;
        
    },
    bindings: {
        corpus: '<',
        grupos: '<'
    }
    
});
