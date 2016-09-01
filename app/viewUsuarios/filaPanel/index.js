'use strict';
angular.module('justineApp').
component('filaPanelUsuarios', {
    templateUrl: 'viewUsuarios/filaPanel/index.html',
    controller: function(__ENV, $http){

        var ctrl = this;
        
        /* Configuro al elemento jt-alerta. TODO: Sigo sin resolver si esta vez no mostraremos más de uno */
        ctrl.alerta = {};
    
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
                    /* Configuro el panel visible  */
                    ctrl.panelActivo = panel;
                }, function(respuesta){
                    console.log(respuesta);
                    ctrl.alerta.titulo = 'Error obteniendo datos de usuario';
                    ctrl.alerta.mensaje = null;
                    ctrl.alerta.codigo = respuesta.status;
                    ctrl.alerta.tipo = 'error';
                });
    
        };

        /* Edito la entrada. Me aseguro que esos detalles sean actualizados en otros componentes */
        ctrl.editarFila = function(uid, usuario, usuarioDetalle){
            var objetoCambio = {'corpus': angular.merge(usuarioDetalle, usuario)};
            /*
             * Acá edito efectivamente al usuario en el servidor backend mediante una peticion backend. 
             *
             * */
            $http.put(__ENV['api']['usuarios']['actualizacion'] + uid, objetoCambio).
                then(function(respuesta){
                    ctrl.alerta.titulo = 'Actualización ejecutada';
                    ctrl.alerta.mensaje = 'El usuarios tal y tal ha sido actualizado con éxito';
                    ctrl.alerta.codigo = respuesta.status;
                    ctrl.alerta.tipo = 'aviso';
                    
                }, function(respuesta){
                    console.log(respuesta);
                    ctrl.alerta.titulo = 'Error actualizando usuario'
                    ctrl.alerta.mensaje = null;
                    ctrl.alerta.codigo = respuesta.status;
                    ctrl.alerta.tipo = 'error';
                })
            
            /* 
             * Subo hacia componente superior inicio, bastan los los datos ligeros de usuario y no de usuarioDetalle 
             * 
             * */
            ctrl.editarEntrada({'entrada': usuario});
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
