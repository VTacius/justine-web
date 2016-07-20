'use strict';

angular.module('justineApp').
component('borradoUsuarios', {
    templateUrl: 'viewUsuarios/borrado/index.html',
    controller: function(){
        var ctrl = this;
        
        /* Devolvemos al componente superior el usuario que se nos dió para mostrar el borrado
         * Se espera que la función tenga un parámetro de nombre usuario
         * */
        ctrl.borrar = function(){
            ctrl.borrarEntrada({usuario: ctrl.usuario});
        }
    },
    
    bindings: {
        usuario: '<',
        borrarEntrada: '&'
    }
});
