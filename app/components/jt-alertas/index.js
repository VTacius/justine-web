'use strict';

angular.module('justineApp').
component('jtAlerta', {
    templateUrl: 'components/jt-alertas/index.html',
    controller: function(__ENV){
        var ctrl = this;

        ctrl.mensajes = __ENV['jtAlerta'];
       
        /* Asociada al botoncito de cerrado */ 
        ctrl.cerrar = function(){
            ctrl.mostrar = false;
        };

        ctrl.$onChanges = function(){
            /*Al menos el tipo y el código de error deben estar presentes para que aparezca la alerta */
            if (angular.isDefined(ctrl.tipo) && angular.isDefined(ctrl.codigo)){
                ctrl.mostrar = true;
            }
            ctrl.alertar(ctrl.codigo, ctrl.titulo, ctrl.mensaje);
        };

        ctrl.alertar = function(codigo, titulo, mensaje){
            /*
                -1 es un mensaje de error de angular, por el momento, cuando falla el CORS, 
                que igual no es su culpa pero es mejor que el lo diga, sin embargo, por el momento, ocurre sólo en un error 404 
                que no puedo controlar aún en el backend
            */
            if (codigo in ctrl.mensajes) {
                ctrl.jtTitulo = titulo;
                ctrl.jtMensaje = ctrl.mensajes[codigo]['mensaje'];
            } else {
                ctrl.jtTitulo = titulo;
                ctrl.jtMensaje = mensaje;
            };
        };
    },
    bindings: {
       tipo: '<',
       titulo: '<',
       mensaje: '<',
       codigo: '<'
    }
});
