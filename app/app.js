'use strict';

/* Gracias a configuracion.js, tenemos un fichero de configuración que no tenemos porque subir
a nuestra forja */

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
    $authProvider.loginUrl = "http://dev.salud.gob.sv:6543/auth/login";
    $authProvider.signupUrl = "http://web.salud.gob.sv:6543/auth/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenHeader = "WWW-Authorization";
    $authProvider.tokenType = "";
    $authProvider.tokenPrefix = "justineApp";
}]).
constant('__ENV', env);
