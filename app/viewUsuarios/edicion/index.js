'use strict';

angular.module('justineApp').
component('edicionUsuarios', {
    templateUrl: 'viewUsuarios/edicion/index.html',
    controller: function($http){

        var ctrl = this;

        ctrl.formularioEdicionUsuarios = {}; 
        ctrl.requerirOficina = true;
       
        /*Contructor, dicho mal y rápido por poner comentario */
        ctrl.$onInit = function(){
            
            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http({method: 'GET', url: '/api/establecimientos.json'}).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    console.log("Acá pasó un error en el servidor, más que nada");
                });

            /* Copiamos el modelo para resetear los valores al original */
            ctrl.usuarioOriginal = angular.copy(ctrl.usuario);
            ctrl.usuarioDetalleOriginal = angular.copy(ctrl.usuarioDetalle);
            ctrl.estadoSamba = angular.copy(ctrl.usuarioDetalle.sambaAcctFlags['estado']);
            
            console.log('Copio datos para luego resetearlos');
            console.log(ctrl.usuarioDetalle);
            console.log(ctrl.usuarioDetalle.sambaAcctFlags['estado']);
        };
        
        /* La funcionalidad en ng-submit de button enviar */
        ctrl.enviar = function(usuario){
            console.log('Estoy a punto de enviar información a modificar al backend');
            console.log(usuario);
            console.log(ctrl.usuarioDetalle);
            console.log(ctrl.estadoSamba);
            ctrl.usuarioDetalle.sambaAcctFlags['estado'] = ctrl.estadoSamba;
            /* Pues que propago el cambio por toda la aplicación para que puedan modificarse */
            ctrl.editarEntrada();
        };

        /* La funcionalidad de cambiar el estado de jt-switch */
        ctrl.actualizaSambaFlags = function(estado){
            ctrl.estadoSamba = estado;
            ctrl.usuarioDetalle.sambaAcctFlags['estado'] = estado;
            
            console.log('Actualizo banderas desde componente edicion');
            console.log(estado);
            console.log(ctrl.usuarioDetalle);
        };
        
        /* La funcionalidad en ng-click de button cancelar */
        ctrl.reiniciar = function(){
            ctrl.formularioEdicionUsuarios.$setUntouched();
            ctrl.usuario = angular.copy(ctrl.usuarioOriginal);
            /* El siguiente no funciona, extrañamente tengo la impresión que debería */
            /* Es que creo que debo subir de componente para que la idea funcione */
            console.log(ctrl.usuarioDetalleOriginal);
            ctrl.usuarioDetalle = angular.copy(ctrl.usuarioDetalleOriginal);
        };
      
        /* Usada en seleccionaEstablecimiento, entre otras cosas porque odio ver tanto identado */
        var obtenerOficinas = function(oficina){
            $http({method: 'GET', url: '/api/oficinas/' + oficina + '.json'}).
                then(function(respuesta){
                    /* console.log("Vamos a llenar oficinas, eso es seguro");*/
                    ctrl.oficinas = respuesta.data;
                    if (!ctrl.oficinas){
                        ctrl.requerirOficina = false; 
                     /*   console.log("Pues que debería llenarse a fuerza oficina");*/
                    }  
                }, function(respuesta){
                    ctrl.requerirOficina = false; 
                    ctrl.oficinas = [];
                    /* console.log("Algo malo pasó en este momento");*/
                });
            
        };
        /* Un callback a angucomplete-alt de establecimiento */
        ctrl.seleccionaEstablecimiento = function(seleccionado){
            if (seleccionado){
                ctrl.usuario.o = seleccionado.originalObject;
                /*console.log(ctrl.usuario.o);
                console.log(ctrl.usuario.o.id);*/
                obtenerOficinas(ctrl.usuario.o.id);
            };
        };

        /* Un callaback a angucomplete-alt de oficina */
        ctrl.seleccionaOficina = function(seleccionado){
            if (seleccionado){
                ctrl.usuario.ou = seleccionado.originalObject.nombre;
            };
        }; 

            
    },
    bindings: {
        usuario: '<',
        usuarioDetalle: '<',
        grupos: '<',
        editarEntrada: '&'
    }

});
