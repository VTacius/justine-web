'use strict';
/*
angular.module('justineApp.computadoras.detalle', ['ngRoute']).
config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/usuarios/:uid', {
        templateUrl: 'viewComputadoras/detalle/index.html',
        controller: 'ComputadorasDetalleController',
        controllerAs: 'ComputadorasDetalleCtrl'
    })
}]).
controller('ComputadorasDetalleController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.corpus = "";
    $scope.uid = $routeParams.uid;
    $http({method: 'GET', url: '/api/detalle_usuario.json'}).
        then(function(respuesta){
                $scope.corpus = respuesta.data.data;
            }, function(respueta){
                console.log(respuesta);
            });
}]);
*/
angular.module('justineApp').component('detalleUsuarioAlejo', {
    templateUrl: 'viewComputadoras/detalle/index.html',
    controller: function(){
        console.log('El componente detalle-usuario');
    },
    bindings: {
        corpus: '<'
    }
    
});
