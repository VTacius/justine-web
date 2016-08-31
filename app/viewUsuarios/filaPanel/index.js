'use strict';
angular.module('justineApp').
component('filaPanelUsuarios', {
    templateUrl: 'viewUsuarios/filaPanel/index.html',
    controller: function(__ENV, $http){

        var ctrl = this;
        
        /*Señala al panel que debe estar activo */
        ctrl.panelActivo = 0;

        /* Verifica si el panel debe estar activo o no según ctrl.panelActivo */
        ctrl.isPanelActivo = function(panel){
            return ctrl.panelActivo === panel;
        };

        /* Todo lo que este en mi alcance para mostrar los tres paneles disponibles */
        ctrl.mostrarPanel= function(panel, usuario){
            /* Obtenemos el detalle de usuarios */
            /* TODO: Sigue debatiendome si la idea de cachear es buena en este punto */
            $http.get(__ENV['api']['usuarios']['detalle'] + usuario ).
                then(function(respuesta){
                    ctrl.usuarioDetalle = respuesta.data.mensaje;
                    console.log(ctrl.usuarioDetalle);
                    /* Configuro el panel visible  */
                    ctrl.panelActivo = panel;
                }, function(respuesta){
                    console.log(respuesta);
                });
    
        };

        /* Edito la entrada. Me aseguro que esos detalles sean actualizados en otros componentes */
        ctrl.editarFila = function(uid, usuario, usuarioDetalle){
            /* Subo hacia inicio, aunque en realidad solo necesito los datos ligeros de usuario y no de usuarioDetalle */
            ctrl.editarEntrada({'entrada': usuario});
            var objetoCambio = {'corpus': angular.merge(usuarioDetalle, usuario)};
            /*
             * Acá edito efectivamente al usuario en el servidor backend mediante una peticion
             * backend. Espero que recuerdes que acá hace falta la información de detalle usuario
             *
             * */
            $http.put(__ENV['api']['usuarios']['actualizacion'] + uid, objetoCambio).
                then(function(respuesta){
                    console.log(respuesta);
                }, function(respuesta){
                    console.log(respuesta);
                })
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
