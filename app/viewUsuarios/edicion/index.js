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
    
}]);
