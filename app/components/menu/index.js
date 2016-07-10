'use strict';

angular.module('componentes.menu', []).

controller('MenuController', ['$scope', '$window', '__ENV', function($scope, $window, __ENV){
    var menu = document.getElementById('menu');
    var toggle = document.getElementById('toggle');

    $scope.usuario = 'alortiz';
    $scope.titulo = __ENV.titulo;

    $scope.toggleHorizontal = function() {
        [].forEach.call(
            menu.querySelectorAll('.menu-can-transform'),
            function(el){
                el.classList.toggle('pure-menu-horizontal');
            }
        );
    };

    $scope.toggleMenu = function () {
        if (menu.classList.contains('open')) {
            setTimeout($scope.toggleHorizontal, 500);
        } else {
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

}]).
directive('menues', [function(){
    return {
        link: function(scope, element, attrs){
            angular.element(window).on('resize', scope.closeMenu);
        },
        restrict: 'E',
        templateUrl: 'components/menu/index.html'
    }

}]);
