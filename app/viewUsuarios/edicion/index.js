'use strict' ;

angular.module('justineApp').
component('edicionUsuarios', {
    templateUrl: 'viewUsuarios/edicion/index.html',
    controller: function($http){

        var ctrl = this;

        ctrl.formularioEdicionUsuarios = {}; 
        ctrl.requerirOficina = true;

        /* Será más bien para dejar en claro como va todo esto */
        ctrl.establecimientos = [];
        ctrl.usuarioOriginal = {};
        ctrl.usuarioDetalleOriginal = {};
       
        /*Contructor, dicho mal y rápido por poner comentario */
        ctrl.$onInit = function(){
            
            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http({method: 'GET', url: '/api/helpers_establecimientos.json'}).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    console.log("Hay un problema con el servidor en este punto");
                });

            /* Copiamos el modelo para resetear los valores al original */
            ctrl.usuarioOriginal = angular.copy(ctrl.usuario);
            ctrl.usuarioDetalleOriginal = angular.copy(ctrl.usuarioDetalle);
            
        };
        
        /* La funcionalidad en ng-submit de button enviar */
        ctrl.enviar = function(usuario){
            /* Pues que propago el cambio por toda la aplicación para que puedan modificarse */
            ctrl.editarEntrada({'entrada': usuario});
        };

        /* La funcionalidad de cambiar el estado de jt-switch para sambaAcctFlags */
        ctrl.actualizaSambaFlags = function(estado){
            ctrl.usuarioDetalle.sambaAcctFlags['estado'] = estado;
        };
        
        /* La funcionalidad de cambiar el estado de jt-switch para cuentaStatus */
        ctrl.actualizaCuentaStatus = function(estado){
            ctrl.usuarioDetalle.cuentaStatus['estado'] = estado;
        };
        
        /* La funcionalidad de cambiar el estado de jt-switch para buzonStatus */
        ctrl.actualizaBuzonStatus = function(estado){
            ctrl.usuarioDetalle.buzonStatus['estado'] = estado;
        };
        
        /* La funcionalidad en ng-click de button cancelar */
        ctrl.reiniciar = function(){
            ctrl.formularioEdicionUsuarios.$setUntouched();
            ctrl.usuario = angular.copy(ctrl.usuarioOriginal);
            /* El siguiente no funciona, extrañamente tengo la impresión que debería */
            /* Es que creo que debo subir de componente para que la idea funcione */
            ctrl.usuarioDetalle = angular.copy(ctrl.usuarioDetalleOriginal);
        };

        /* Versan sobre el comportamiento de los componentes establecimiento y oficina */
      
        /* Usada en seleccionaEstablecimiento, entre otras cosas porque odio ver tanto identado */
        var obtenerOficinas = function(oficina){
            $http({method: 'GET', url: '/api/helpers_oficinas/' + oficina + '.json'}).
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
