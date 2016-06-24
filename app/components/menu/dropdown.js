'use strict';

angular.module('myApp.menu', [])

.directive('dropdown', [function(){
    return function(scope, elm, attrs){
        restrict: 'E',
        elm.on('mouseover', function(event){
            console.log("Sigo queriendo loguear cuando me coloco sobre el raton");
        });
    };
}]);
