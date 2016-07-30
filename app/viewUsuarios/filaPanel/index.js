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
            console.log('filaPanel.obtenerDetalleUsuario: Estoy obteniendo datos');
            /* TODO: Será necesario cuidar que esto no se realize innecesarimente */
            $http({method: 'GET', url: '/api/usuario_detalle.json'}).
                then(function(respuesta){
                    ctrl.corpus = respuesta.data.data;
                    gestionaVisibilidad(detalle, edicion, borrado);
                    /* Esto es algo por el momento, pero sigo sin */
                    ctrl.datos = angular.merge( ctrl.corpus, ctrl.usuario);
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

        /* Edito la entrada. Me aseguro que esos detalles sean actualizados en otros componentes */
        ctrl.editarFila = function(usuario){
            /* Subo hacia inicio, necesito que otros componentes puedan ver los cambios */
            ctrl.editarEntrada({'entrada': usuario});
            console.log("No es por nada, quiero revisar que ocurra esto");
            console.log(usuario);
            /*
             * Acá edito efectivamente al usuario en el servidor backend mediante una peticion
             * backend. Espero que recuerdes que acá hace falta la información de detalle usuario
             *
             * */
        };

        /* Función intermedia entre el componente borrar-usuarios y el controlador inicio  */
        ctrl.borrarFila = function(usuario){
            ctrl.borrarEntrada({'entrada': usuario});
            /* 
             *   Acá funcionalidad para precisamente borrar al usuario de la base de datos $http 
             *   Este componente podría usarse en una URL propia, así que operaciones $http de acá no pasarán 
             *
             * */
        };
    },
    bindings: {
        usuario: '<',	
        grupos: '<',
        editarEntrada: '&',
        borrarEntrada: '&'
    }
});
