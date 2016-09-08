'use strict';

angular.module('justineApp.sistema.auth', ['ngRoute']).
config(['$routeProvider', function($routeProvider) { 
    $routeProvider.when('/auth/login', {
        templateUrl: 'viewSistema/auth/index.html',
        controller: 'sistemaAuthController',
        controllerAs: '$ctrl'
    });
}]).
controller('sistemaAuthController', ['$auth', function($auth){
    var ctrl = this;
   
    /* Vuelvo a declarar el formulario de una manera general */ 
    ctrl.formularioAuth = {};

    /* Configuro al elemento jt-alerta. TODO: Sigo sin resolver si esta vez no mostraremos más de uno */
    ctrl.alerta = {};

    ctrl.enviar = function(validacion, username, password){
        if (validacion){
            console.log(username, password);
            $auth.login({
                email: username,
                password: password 
            }).
            then(function(respuesta){
                console.log('Parece ser que estamos autenticados');
                console.log(respuesta);
            }).
            catch(function(respuesta){
                console.log('No nos hemos logueado aún');
                ctrl.alerta.titulo = 'El servidor acaba de devolver una mensaje con el siguiente contenido:';
                ctrl.alerta.mensaje = null;
                ctrl.alerta.codigo = respuesta.status;
                ctrl.alerta.tipo = 'error';
            })
        };
        return; 
    };
}]);
