'use strict';

angular.module('justineApp').
component('detalleUsuarios', {
    templateUrl: 'viewUsuarios/detalle/index.html',
    controller: function(){

        var ctrl = this;
        
        ctrl.$onInit = function(){
            console.log('¿En que momento ocurre esto?');
        };
    },
    bindings: {
        corpus: '<'
    }
    
});
