'use strict';

angular.module('justineApp').
component('detalleUsuarios', {
    templateUrl: 'viewUsuarios/detalle/index.html',
    controller: function(){

        var ctrl = this;

        ctrl.grupoUsuarios = ctrl.corpus.grupo;
        ctrl.gruposUsuarios = ctrl.corpus.grupos;
        
    },
    bindings: {
        corpus: '<',
        grupos: '<'
    }
    
});
