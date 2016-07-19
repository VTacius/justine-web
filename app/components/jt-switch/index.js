'use strict';

angular.module('componentes.switch', []).
component('jtSwitch', {
    templateUrl: 'components/jt-switch/index.html',
    controller: function(){ 
        var ctrl = this;

        ctrl.valor = ctrl.corpus.estado;
        console.log(ctrl.corpus.estado);
        ctrl.on = 'on' in ctrl.corpus ? ctrl.corpus.on : "Activo";
        ctrl.off = ctrl.corpus.off ? ctrl.corpus.off : "Inactivo";
        
        ctrl.retornaValor = function(){
            console.log('Vamos a actualizar componente');
            console.log(ctrl.valor);
            ctrl.actualiza({'estado': ctrl.valor});
        };
    },
    bindings: {
        corpus: '<',
        actualiza: '&'
    }
});
