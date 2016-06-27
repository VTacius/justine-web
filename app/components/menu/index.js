'use strict';

angular.module('componentes.menu', [])
.controller('controladorMenu', ['$scope', function($scope){
    var menu = document.getElementById('menu');
    var toggle = document.getElementById('toggle');
    $scope.usuario = 'alortiz';

    $scope.toggleHorizontal = function() {
        [].forEach.call(
            menu.querySelectorAll('.menu-can-transform'),
            function(el){
                el.classList.toggle('pure-menu-horizontal');
            }
        );
    };

    $scope.toggleMenu = function () {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            setTimeout($scope.toggleHorizontal, 500);
        }
        else {
            $scope.toggleHorizontal();
        }
        menu.classList.toggle('open');
        toggle.classList.toggle('x');
    };

}])
.directive('menues', [function(){
    return {
        templateUrl: 'components/menu/index.html'
    }
}]);
