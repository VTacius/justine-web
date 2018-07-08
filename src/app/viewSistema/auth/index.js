'use strict';

angular.module('justineApp.sistema.auth', ['ngRoute']).
config(['$routeProvider', function($routeProvider) { 
    $routeProvider.when('/auth/login', {
        data: {
            roles: ['unauthenticated']
        },
        templateUrl: 'viewSistema/auth/index.html',
        controller: 'SistemaAuthController',
        controllerAs: '$ctrl'
    });
}]).
controller('SistemaAuthController', ['$auth', '$location', '$window', '$rootScope', 'tituladorService', function($auth, $location, $window, $rootScope, tituladorService){
    var ctrl = this;
   
    /* Disponemos del mensaje de alerta en este controlador */
    ctrl.alerta = {};

    /* Cambio el titulo de nuestra página */
    tituladorService('Entrada a Directorio Institucional');

    /* Vuelvo a declarar el formulario de una manera general */ 
    ctrl.formularioAuth = {};

    ctrl.enviar = function(validacion, username, password){
        if (validacion){
            $auth.login({
                email: username,
                password: password 
            }).
            then(function(respuesta){
                
                /* Algo así como "configurar variables de sesión"*/
                $window.localStorage.setItem('uid', username);
                $window.localStorage.setItem('gecos', respuesta.data.gecos);
                
                /* Avisamos a nuestros ancestros que nos hemos autenticado */
                $rootScope.$emit('autenticado', {'usuario': username, 'gecos': respuesta.data.gecos}); 
                 
                /* Redirigimos a la vista de inicio */
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
    };
}]);
