'use strict';

angular.module('justineApp.inicio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inicio', {
    templateUrl: 'viewInicio/index.html',
    controller: 'InicioController',
    controllerAs: '$ctrl'
  });
}])

.controller('InicioController', ['__ENV', function(__ENV){
    var ctrl = this;
    ctrl.titulo = __ENV.titulo;
}])
;
