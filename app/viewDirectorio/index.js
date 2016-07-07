'use strict';

angular.module('justineApp.directorio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/directorio', {
    templateUrl: 'viewDirectorio/index.html',
    controller: 'DirectorioController',
    controllerAs: 'DirectorioCtrl',
  });
}])
.controller('DirectorioController', ['$scope', '$http', function($scope, $http){
    $scope.corpus = ""; 
    $scope.fetch = function(){
        $http({method: 'GET', url: '/api/directorio.json'}).
            then(function(respuesta){
                $scope.corpus = respuesta.data.data;
            }, function(response){
                console.log($scope.corpus);
            });
   };
}]);
