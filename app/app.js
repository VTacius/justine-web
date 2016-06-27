'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'componentes.menu',
  'myApp.inicio',
  'myApp.usuario.actualizacion'
]).
run(function(){
    angular.element(window).on('resize', function(){
    })
}).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/inicio'});
}]);
