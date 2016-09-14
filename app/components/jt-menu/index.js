'use strict';

angular.module('componentes.menu', []).

component('jtMenu', {
    templateUrl: 'components/jt-menu/index.html',
    controller: function(__ENV, $auth, $location){
        var ctrl = this;
        
        /* Obtenemos datos, principalmente de la sesión */       
        ctrl.titulo = __ENV.titulo;
        ctrl.sesion = __ENV.sesion;

        /* Empezamos los comportamientos */
        ctrl.mostrarPanel = false;

        ctrl.indiceActivo = 100;

        ctrl.muestraSubMenu = function(indice){
            return indice === ctrl.indiceActivo;
        };

        ctrl.mostrarSubMenu = function(indice){
            ctrl.indiceActivo = indice;
        };
        
        ctrl.cerrarSession = function(){
            $auth.logout();
            $location.path('/auth/login');
            /* TODO: Asegurarnos de borrar toda contenido que del usuario necesitamos */
        };

        ctrl.muestraPanel = function(estado){
            ctrl.mostrarPanel = estado;
            
            /* Tambień ocultamos el submenú en este momento */
            ctrl.indiceActivo = 100;
        }
    }
})
