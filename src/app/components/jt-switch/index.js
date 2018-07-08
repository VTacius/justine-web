'use strict';

angular.module('componentes.switch', []).

component('jtSwitch', {
    templateUrl: 'components/jt-switch/index.html',
    controller: function(){ 
        var ctrl = this;
        
        /* Este momento es bastante interesante. Ocurre la primera vez que se carga la página (
         * (No sé en que momemnto exacto) y luego ocurre cada vez que el model superior es cambiado, 
         * según la documentación. Ahora, me sirvo para actualizar el estado de una variable externa, (En mi caso, 
         * es para el reset del formulario en general, algo que podría pensarse que va a suceder automáticamente
         **/
        ctrl.$onChanges= function(){
            /** console.log("Algo pasó y debe ser registrado");
            console.log("Este es el estado actual del componte");
            console.log(ctrl.corpus.estado); */
            ctrl.valor = ctrl.corpus;
        };

        ctrl.on = ctrl.mensajes ? ctrl.mensajes.on : "Activo";
        ctrl.off = ctrl.mensajes ? ctrl.mensajes.off : "Inactivo";
       
        /* Devolvemos a cualquier que sea nuestro superior, el valor que el modelo del componente 
         * adquiere en su evento click, 
         * Se espera que la función tenga un sólo parámetro de nombre estado*/ 
        ctrl.retornaValor = function(){
            /* console.log('Vamos a actualizar componente');
            console.log(ctrl.valor)*/;
            ctrl.actualiza({'estado': ctrl.valor});
        };
    },
    bindings: {
        corpus: '<',
        mensajes: '<',
        actualiza: '&'
    }
});
