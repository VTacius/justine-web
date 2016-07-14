'use strict';

angular.module('justineApp').
component('filaPanelUsuarios', {
    templateUrl: 'viewUsuarios/filaPanel/index.html',
    controller: function($http){

        var ctrl = this;
        
        ctrl.corpus = {};
        ctrl.muestraPanelDetalle = false;
        ctrl.muestraPanelEdicion = false;                   

        ctrl.mostrarPanel= function(panel){
            if (panel === 1){
                /* Controlamos los panel al menos de esta manera */
                ctrl.muestraPanelDetalle = true;
                ctrl.muestraPanelEdicion = false;                   
               
                /* Si abrimos el panel, vamos a necesitar llenar los datos */
                $http({method: 'GET', url: '/api/detalle_usuario.json'}).
                    then(function(respuesta){
                        ctrl.corpus = respuesta.data.data;
                    }, function(respuesta){
                        console.log(respuesta);
                    });

            }else if(panel == 2){
                /* Controlamos los panel */
                ctrl.muestraPanelEdicion = true;                   
                ctrl.muestraPanelDetalle = false;

                /* Si abrimos el panel  Obtenemos los datos del usuario a modificar */
                $http({method: 'GET', url: '/api/detalle_usuario_modificacion.json'}).
                    then(function(respuesta){
                        ctrl.corpus = respuesta.data.data;
                    },function(respuesta){
                        console.log("Ha ocurrido un error, creo recordar");
                    });
            
            };
        };
    },
    bindings: {
        usuario: '<'	
    }
});
