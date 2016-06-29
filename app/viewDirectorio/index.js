'use strict';

angular.module('myApp.directorio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/directorio', {
    templateUrl: 'viewDirectorio/index.html',
    controller: 'directorioCtrl',
  });
}])
.controller('directorioCtrl', ['$scope', '$http', function($scope, $http){
    $scope.corpus = []; 
    $scope.fetch = function(){
        $http({method: 'GET', url: '/api/directorio.json'}).
            then(function(respuesta){
                console.log(respuesta);
                $scope.corpus = respuesta.data;
                angular.forEach($scope.corpus, function(elem){console.log(elem)});
                console.log(typeof($scope.corpus));
                console.log($scope.corpus);
            }, function(response){
                console.log($scope.corpus);
            });
   };
}]);
