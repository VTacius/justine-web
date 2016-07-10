'use strict';

var RE_NOMBRE = /^([A-Z]{1}([a-z]+|\s|$)\s{0,1}){1,4}$/ 
var RE_NIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
var RE_DUI = /^\d{9}-\d{1}$/;
var RE_TELEFONO = /^\d{4}(-*\d{4})*$/;

angular.module('componentes.validaciones', []).

directive('sustantivos', function(){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.sustantivos = function(modelValue, viewValue){
                if (RE_NOMBRE.test(viewValue)){
                    return true;
                };
               
                /* Así, con require, no presentamos un doble mensaje al usuario */
                if (ctrl.$isEmpty(modelValue)){
                    return true;
                };
                
                return false;
            }
        }
    }
}).
directive('dui', function(){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.dui = function(modelValue, viewValue){
                if (RE_DUI.test(viewValue)){
                    return true;
                };

                if (ctrl.$isEmpty(modelValue)){
                    return true;
                };

                return false;
            }
        }
    }
}).
directive('nit', function(){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.nit = function(modelValue, viewValue){
                if (RE_NIT.test(viewValue)){
                    return true;
                };

                if (ctrl.$isEmpty(modelValue)){
                    return true;
                };

                return false;
            }
        }
    }
}).
directive('telefono', function(){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.telefono = function(modelValue, viewValue){
                if (RE_TELEFONO.test(viewValue)){ return true;
                    return true
                };

                if (ctrl.$isEmpty(modelValue)){
                    return true;
                };

                return false;
            }
        }
    }
});
