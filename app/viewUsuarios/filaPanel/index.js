'use strict';

angular.module('justineApp').
component('filaPanelUsuarios', {
    templateUrl: 'viewUsuarios/filaPanel/index.html',
    controller: function($http){

        var ctrl = this;
        
        ctrl.corpus = {};
        ctrl.muestraPanelDetalle = false;
        ctrl.muestraPanelEdicion = false;                   
        ctrl.muestraPanelBorrado = false;                   
        
        /* Decido cual de todos los paneles debe estar visible o no */
        var gestionaVisibilidad = function(detalle, edicion, borrado){
            ctrl.muestraPanelDetalle = detalle;
            ctrl.muestraPanelEdicion = edicion;                   
            ctrl.muestraPanelBorrado = borrado;                   
        };

        /* Obtiene los datos desde una fuente externa. Pensé, pensé que aparecería en el scope de Chrome */
        var obtenerDetalleUsuario = function(detalle, edicion, borrado){
            console.log('Estoy obteniendo datos');
            $http({method: 'GET', url: '/api/detalle_usuario.json'}).
                then(function(respuesta){
                    ctrl.corpus = respuesta.data.data;
                    gestionaVisibilidad(detalle, edicion, borrado);
                }, function(respuesta){
                    console.log(respuesta);
                });
    
        };

        /* Todo lo que este en mi alcance para mostrar los tres paneles disponibles */
        ctrl.mostrarPanel= function(panel){
            if (panel === 1){
                obtenerDetalleUsuario(true, false, false);
            }else if(panel === 2){
                obtenerDetalleUsuario(false, true, false);
            }else if(panel === 3){
                obtenerDetalleUsuario(false, false, true);
            };
        };

        /* Borro la entrada. Accedo a borrarEntrada que recibe desde nivel superior */
        ctrl.borrarFila = function(){
            console.log("Estoy por borrar fila desde filaPanel.borrarFila con el método borrarEntrada que recibo desde inicio");
            ctrl.borrarEntrada(ctrl.usuario);
        };
    },
    bindings: {
        usuario: '<',	
        grupos: '<',
        borrarEntrada: '&'
    }
});
