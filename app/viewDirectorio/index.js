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
                console.log(respuesta);
                $scope.corpus = respuesta.data.data;
                angular.forEach($scope.corpus, function(elem){console.log(elem)});
                console.log(typeof($scope.corpus));
                console.log($scope.corpus);
            }, function(response){
                console.log($scope.corpus);
            });
   };
}]);
