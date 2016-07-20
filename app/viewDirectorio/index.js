'use strict';

angular.module('justineApp.directorio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/directorio', {
    templateUrl: 'viewDirectorio/index.html',
    controller: 'DirectorioController',
    controllerAs: '$ctrl',
  });
}])
.controller('DirectorioController', ['$http', function($http){
    var ctrl = this;
    ctrl.corpus = []; 
    $http({method: 'GET', url: '/api/directorio.json'}).
        then(function(respuesta){
            ctrl.corpus = respuesta.data.data;
        }, function(response){
            console.log(ctrl.corpus);
        });
}]);
