'use strict';

angular.module('justineApp').
component('filaUsuarios', {
    templateUrl: 'viewUsuarios/inicio/filaUsuarioComponent.html',
    controller: function($http){
        var ctrl = this;
        ctrl.corpus = "";
        ctrl.muestraDetalleUsuario = false;
        ctrl.mostrarDetalleUsuario = function(){
            $http({method: 'GET', url: '/api/detalle_usuario.json'}).
                then(function(respuesta){
                    ctrl.corpus = respuesta.data.data;
                    ctrl.muestraDetalleUsuario = true;
                }, function(respuesta){
                    console.log(respuesta);
                })
        };
    },
    bindings: {
        usuario: '<'	
    }
});