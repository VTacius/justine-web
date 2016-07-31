'use strict';

angular.module('justineApp').
component('filaPanelComputadoras', {
    templateUrl: 'viewComputadoras/filaPanel/index.html',
    controller: function($http){

        var ctrl = this;
        
        ctrl.muestraPanelDetalle = false;
        ctrl.muestraPanelEdicion = false;                   
        ctrl.muestraPanelBorrado = false;                   
        
        /* Decido cual de todos los paneles debe estar visible o no */
        var gestionaVisibilidad = function(detalle, edicion, borrado){
            ctrl.muestraPanelDetalle = detalle;
            ctrl.muestraPanelEdicion = edicion;                   
            ctrl.muestraPanelBorrado = borrado;                   
        };

        /* Obtenemos el detalle de computadoras */
        var obtenerDetalleComputadora = function(detalle, edicion, borrado){
            
            gestionaVisibilidad(detalle, edicion, borrado);
            console.log('filaPanel.obtenerDetalleUsuario: Estoy obteniendo datos');
            /* TODO: Será necesario cuidar que esto no se realize innecesarimente 
            $http({method: 'GET', url: '/api/computadoras_detalle.json'}).
                then(function(respuesta){
                    ctrl.computadorasDetalle = respuesta.data.data;
                    console.log(ctrl.computadorasDetalle);
                    gestionaVisibilidad(detalle, edicion, borrado);
                    /* Esto es algo por el momento, pero sigo sin 
                }, function(respuesta){
                    console.log(respuesta);
                });
                */
    
        };
        

        /* Todo lo que este en mi alcance para mostrar los tres paneles disponibles */
        ctrl.mostrarPanel= function(panel){
            if (panel === 1){
                obtenerDetalleComputadora(true, false, false);
            }else if(panel === 2){
                obtenerDetalleComputadora(false, true, false);
            }else if(panel === 3){
                obtenerDetalleComputadora(false, false, true);
            };
        };

        /* Edito la entrada. Me aseguro que esos detalles sean actualizados en otros componentes */
        ctrl.editarFila = function (computadora, computadoraDetalle){
            /* Subo hacia inicio, aunque en realidad solo necesito los datos ligeros de computadora y no de computadoraDetalle */
            ctrl.editarEntrada({'entrada': computadora});
            console.log("No es por nada, quiero revisar que ocurra esto");
            console.log (computadora);
            console.log (computadoraDetalle);
            console.log('Así es el objeto que enviaremos a la horca');
            objetoCambio = angular.merge (computadoraDetalle, computadora);
            console.log(objetoCambio);
            /*
             * Acá edito efectivamente al computadora en el servidor backend mediante una peticion
             * backend. Espero que recuerdes que acá hace falta la información de detall computadorao
             *
             * */
        };

        /* Función intermedia entre el componente borrar computadoras y el controlador inicio  */
        ctrl.borrarFila = function (computadora){
            ctrl.borrarEntrada({'entrada': computadora});
            /* 
             *   Acá funcionalidad para precisamente borrar al computadora de la base de datos $http 
             *   Este componente podría usarse en una URL propia, así que operaciones $http de acá no pasarán 
             *
             * */
        };
    },
    bindings: {
        computadora: '<',	
        editarEntrada: '&',
        borrarEntrada: '&'
    }
});
