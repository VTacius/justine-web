'use strict';

angular.module('componentes.menu', []).

component('jtMenu', {
    templateUrl: 'components/jt-menu/index.html',
    controller: function(__ENV){
        var ctrl = this;
       
        ctrl.titulo = __ENV.titulo;
        ctrl.sesion = __ENV.sesion;
    }
})
