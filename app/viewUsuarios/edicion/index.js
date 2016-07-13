'use strict';

angular.module('justineApp.usuarios.edicion', ['ngRoute']).

config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/usuarios/:uid/edicion', {
        templateUrl: 'viewUsuarios/edicion/index.html',
        controller: 'UsuariosDetalleController',
        controllerAs: 'UsuariosDetalleCtrl'
    })
}]).

controller('UsuariosDetalleController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    $scope.uid = $routeParams.uid;
    
    $scope.corpus = {};
    $scope.usuario = {};
    
    $http({method: 'GET', url: '/api/detalle_usuario_modificacion.json'}).
        then(function(respuesta){
            $scope.corpus = respuesta.data.data;
            $scope.usuario = angular.copy($scope.corpus);
        },function(respuesta){
            console.log("Ha ocurrido un error, creo recordar");
        });

    $http({method: 'GET', url: '/api/establecimientos.json'}).
        then(function(respuesta){
            $scope.establecimientos = respuesta.data;
        }, function(respuesta){
            console.log("Acá pasó un error en el servidor, más que nada");
        });
    
    $scope.enviar = function(corpus){
        console.log(corpus);
    };

    $scope.reiniciar = function(){
        $scope.formularioEdicionUsuarios.$setUntouched();
        $scope.corpus = angular.copy($scope.usuario);
    };

    $scope.seleccionaEstablecimiento = function(seleccionado){
        if (seleccionado){
            $scope.corpus.o = seleccionado.originalObject;
            $http({method: 'GET', url: '/api/oficinas.json'}).
                then(function(respuesta){
                    console.log("Vamos a llenar oficinas, eso es seguro");
                    $scope.oficinas = respuesta.data;
                }, function(respuesta){
                    console.log("Algo malo pasó en este momento");
                });
        };
    };

    $scope.seleccionaOficina = function(seleccionado){
        if (seleccionado){
            $scope.corpus.ou = seleccionado.originalObject;
        };
    }; 

}]);
