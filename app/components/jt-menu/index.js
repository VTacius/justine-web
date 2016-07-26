'use strict';

angular.module('componentes.menu', []).

component('jtMenu', {
    templateUrl: 'components/jt-menu/index.html',
    controller: function(__ENV){
        var ctrl = this;
        
        /* Obtenemos datos, principalmente de la sesión */       
        ctrl.titulo = __ENV.titulo;
        ctrl.sesion = __ENV.sesion;

        /* Empezamos los comportamientos */
        ctrl.mostrarPanel = false;

        ctrl.muestraPanel = function(estado){
            ctrl.mostrarPanel = estado;
        }
    }
})
