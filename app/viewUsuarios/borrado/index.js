'use strict';

angular.module('justineApp').
component('borradoUsuarios', {
    templateUrl: 'viewUsuarios/borrado/index.html',
    controller: function(){
        var ctrl = this;

        ctrl.borrar = function(){
            console.log("Lastimosamente, tomé demasiadas vueltas sólo para que el usuario pueda confirmar que quiere borrar");
            ctrl.borrarEntrada();
        }
    },
    
    bindings: {
        uid: '<',
        borrarEntrada: '&'
    }
});
