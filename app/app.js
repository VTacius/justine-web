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
    'angucomplete-alt',
    'componentes.menu',
    'componentes.validaciones',
    'componentes.filtros',
    'justineApp.inicio',
    'justineApp.directorio',
    'justineApp.usuarios.inicio',
    'justineApp.grupos.inicio',
    'justineApp.computadoras.inicio',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/inicio'});
}]).
constant('__ENV', env);
