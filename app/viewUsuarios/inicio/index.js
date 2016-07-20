'use strict';

angular.module('justineApp.usuarios.inicio', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarios/', {
    templateUrl: 'viewUsuarios/inicio/index.html',
    controller: 'UsuariosInicioController',
    controllerAs: 'UsuariosInicioCtrl'
  });
}])
.controller('UsuariosInicioController', ['$scope', '$http', function($scope, $http) {

    $scope.corpus = {};
    $scope.listadogrupos = {};
    $scope.buzon = {estado: true, mensaje: "Activo"};
    $scope.actualizaBuzon = function(estado){
        $scope.buzon.estado = estado;
    };
    
    /* Obtener el listado de grupos en este punto debería evitar hacerlo muchas veces, provee por otro lado una forma lógica de refresco  */
    $http({method: 'GET', url: '/api/helpers_grupos.json'}).
       then(function(respuesta){
            $scope.listadogrupos = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema en este punto");
            console.log(respuesta);
    });
    
    /* El listado de usuarios existentes es parte del controlador que pertenece a UsuariosInicioCtrl */
    $http({method: 'GET', url: '/api/listado_usuario.json'}).
        then(function(respuesta){
            $scope.corpus = respuesta.data;
        }, function(respuesta){
            console.log("Hay un problema en este punto");
            console.log(respuesta);
        });

    /* Hemos subido hasta acá para asegurar que la entrada será borrada en tiempo real de la lista */
    /* El nombre dado al parámetro debe ser usado cuando se pase esta función en binding al siguiente componente */
    $scope.borrarEntradaListado = function(entrada){
        var indice = $scope.corpus.indexOf(entrada)
        if (indice >= 0){
            $scope.corpus.splice(indice, 1);
        };
    };

    /* Subí hasta acá para asegurar que la entrada usuario será editada en tiempo real de la lista, precisamente en otros componentes que la usan de esa forma */
    $scope.editarEntradaListado = function(detalle){
        var indice = $scope.corpus.indexOf(detalle)
        if (indice >=0){
            $scope.corpus[indice] = detalle;
        };
    };
}]);
