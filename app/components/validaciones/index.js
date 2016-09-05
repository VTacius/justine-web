'use strict';

var RE_NOMBRE = /^([A-Zd]{1}([a-záéíóúÁÉÍÓÚ]+|\s|$)\s{0,1}){1,4}$/ 
var RE_NIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
var RE_DUI = /^\d{9}-\d{1}$/;
var RE_TELEFONO = /^\d{4}(-*\d{4})*$/;
var RE_JVS = /^\d{1,12}$/;

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
                if (RE_TELEFONO.test(viewValue)){ 
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
directive('jvs', function(){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.jvs = function(modelValue, viewValue){
                if (RE_JVS.test(viewValue)){ 
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
directive('uid', ['$http', '$q', function($http, $q){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.uid = function(modelValue, viewValue){
                /* Pequeña obra de arte. No entiendo como algo tan sencillo puede funcionar tan bien, y eso es un framework*/
                return $http.get('http://dev.salud.gob.sv:6543/usuarios/' + viewValue ).then(
                    function(respuesta){
                        return $q.reject(false);
                    }, function(respuesta){
                        return $q.resolve(true);
                    });
            };
            
        }
    }
}]);
