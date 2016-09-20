'use strict';

/* Obtenemos información de configuracion.js */
var env = {};
if (window) {
    Object.assign(env, window.__env);
};

// Declare app level module which depends on views, and components
angular.module('justineApp', [
    'ngRoute',
    'satellizer',
    'angucomplete-alt',
    'componentes.menu',
    'componentes.switch',
    'componentes.validaciones',
    'componentes.filtros',
    'componentes.estados',
    'componentes.buscador',
    'justineApp.sistema.auth',   
    'justineApp.inicio',
    'justineApp.directorio',
    'justineApp.usuario.actualizacion',
    'justineApp.usuarios.inicio',
    'justineApp.usuarios.creacion',
    'justineApp.grupos.inicio',
    'justineApp.computadoras.inicio',
]).
config(['$locationProvider', '$routeProvider', '$authProvider', function($locationProvider, $routeProvider, $authProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/inicio'});
    /* Parametros de configuración para satellizer */
    $authProvider.loginUrl = 'http://dev.salud.gob.sv:6543/auth/login';
    $authProvider.signupUrl = 'http://web.salud.gob.sv:6543/auth/signup';
    $authProvider.tokenName = 'token';
    $authProvider.tokenHeader = 'WWW-Authorization';
    $authProvider.tokenType = '';
    $authProvider.tokenPrefix = 'justineApp';
}]).
run(['$rootScope', '$auth', '$location', function($rootScope, $auth, $location){
    $rootScope.$on('$routeChangeStart', function(evento, datos){
        /* Sin data.roles, negamos por defecto la entrada a la página */
        if ('data' in datos){
            var ruta = 'originalPath' in datos.$$route ? datos.$$route.originalPath: '/main';
            if ( $auth.isAuthenticated() ){
                var permisos = datos.data.roles;
                var rol = $auth.getPayload()['rol'];
                if (permisos.indexOf(rol) >= 0){
                    return true;
                } 
            } else {
                /* Redirigimos a /auth/login para que se autentique */
                $location.path('/auth/login');
                
                return ruta  === '/auth/login';
            };
        }
        return evento.preventDefault();
    });
}]).
constant('__ENV', env);
