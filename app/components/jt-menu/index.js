'use strict';

angular.module('componentes.menu', []).

component('jtMenu', {
    templateUrl: 'components/jt-menu/index.html',
    controller: function(__ENV, $auth, $location, $window, $rootScope){
        var ctrl = this;
       
        ctrl.$onChanges = function(cambios){
            /* Obtenemos datos, principalmente de la sesión */       
            ctrl.titulo = __ENV.titulo;
            var rol = ($auth.getPayload()) ? $auth.getPayload()['rol']: 'unauthenticated';
            ctrl.menu = __ENV.menu(rol);
            ctrl.usuario = $window.localStorage.getItem('uid');
            ctrl.gecos = $window.localStorage.getItem('gecos');
        }; 

        /* 
         * Este enfoque permite que jt-menu siga siendo un componente bastante independiente, a la vez que pueda
         * actualizar la información cuando el usuario se autentique sin necesidad de refrescar la página
         **/
        $rootScope.$on('autenticado', function(evento, args){
            ctrl.usuario = args.usuario;
            ctrl.gecos = args.gecos;
            var rol = ($auth.getPayload()) ? $auth.getPayload()['rol']: 'unauthenticated';
            ctrl.menu = __ENV.menu(rol);
        });

        /* Empezamos a definir el comportamiento */
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
            ctrl.usuario = '';
            ctrl.gecos = '';
            $window.localStorage.removeItem('uid');
            $window.localStorage.removeItem('gecos');
            ctrl.menu = __ENV.menu('unauthenticated');
        };

        ctrl.muestraPanel = function(estado){
            ctrl.mostrarPanel = estado;
            
            /* Tambień ocultamos el submenú en este momento */
            ctrl.indiceActivo = 100;
        }
    }
})
