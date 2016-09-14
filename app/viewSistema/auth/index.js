'use strict';

angular.module('justineApp.sistema.auth', ['ngRoute']).
config(['$routeProvider', function($routeProvider) { 
    $routeProvider.when('/auth/login', {
        data: {
            roles: ['unauthenticated']
        },
        templateUrl: 'viewSistema/auth/index.html',
        controller: 'sistemaAuthController',
        controllerAs: '$ctrl'
    });
}]).
controller('sistemaAuthController', ['$auth', '$location', '__ENV', function($auth, $location, __ENV){
    var ctrl = this;
   
    /* Vuelvo a declarar el formulario de una manera general */ 
    ctrl.formularioAuth = {};

    /* Configuro al elemento jt-alerta. TODO: Sigo sin resolver si esta vez no mostraremos más de uno */
    ctrl.alerta = {};

    ctrl.enviar = function(validacion, username, password){
        if (validacion){
            $auth.login({
                email: username,
                password: password 
            }).
            then(function(respuesta){
                __ENV.sesion.uid = username;
                $location.path('/inicio');
            }).
            catch(function(respuesta){
                console.log(respuesta);
                ctrl.alerta.titulo = 'Autenticación fallida';
                ctrl.alerta.mensaje = 'Credenciales inválidas';
                ctrl.alerta.codigo = respuesta.status;
                ctrl.alerta.tipo = 'error';
            });
        };
        return; 
    };
}]);
