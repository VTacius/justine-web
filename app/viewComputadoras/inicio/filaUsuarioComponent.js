'use strict';

angular.module('justineApp').
component('filaUsuarios', {
    templateUrl: 'viewComputadoras/inicio/filaUsuarioComponent.html',
    controller: function($http){
        var ctrl = this;
        ctrl.corpus = "";
        ctrl.mostrarDetalleUsuario = function(){
            console.log('Así que puedo meter esta función en el botón bendito aquel');
            $http({method: 'GET', url: '/api/detalle_usuario.json'}).
                then(function(respuesta){
                    ctrl.corpus = respuesta.data.data;
                }, function(respuesta){
                    console.log(respuesta);
                })
        };
    },
    bindings: {
        usuario: '<'	
    }
});
