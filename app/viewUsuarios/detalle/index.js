'use strict';
angular.module('justineApp').component('detalleUsuarios', {
    templateUrl: 'viewUsuarios/detalle/index.html',
    controller: function(){
        this.$onInit = function(){
            console.log('¿En que momento ocurre esto?');
        };
    },
    bindings: {
        corpus: '<'
    }
    
});
