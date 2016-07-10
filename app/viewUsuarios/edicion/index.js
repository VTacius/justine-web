'use strict';

angular.module('justineApp.usuarios.edicion', ['ngRoute']).

config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/usuarios/:uid/edicion', {
        templateUrl: 'viewUsuarios/edicion/index.html',
        controller: 'UsuariosDetalleController',
        controllerAs: 'UsuariosDetalleCtrl'
    })
}]).

controller('UsuariosDetalleController', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.usuario = $routeParams.uid;
    $scope.enviar = function(corpus){
        console.log(corpus);
    };
    $scope.reiniciar = function(){
        console.log("Pongo a corpus al valor que nos devolvió desde $http, sin hacer en este momento");
    }
}]);
