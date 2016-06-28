'use strict';

angular.module('componentes.menu', [])
.controller('controladorMenu', ['$scope', '$window', function($scope, $window){
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
    
    $scope.closeMenu = function() {
        if (menu.classList.contains('open')) {
            $scope.toggleMenu();
        }
    }

}])
.directive('menues', ['$window', function($window){
    return {
        link: function(scope, element, attrs){
            scope.width = $window.innerWidth;
            angular.element($window).on('resize', scope.closeMenu);
        },
        restrict: 'E',
        templateUrl: 'components/menu/index.html'
    }

}]);
