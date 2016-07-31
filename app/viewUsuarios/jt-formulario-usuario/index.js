'use strict';

angular.module('justineApp').
component('jtFormularioUsuario', {
    templateUrl: 'viewUsuarios/jt-formulario-usuario/index.html',
    controller: function (__ENV, $http) {
        var ctrl = this;
        
        /* "Declarar" el formulario en este punto permite manipularlo a este nivel. Por otra parte, parecía haber problemas con el nombre en cierto momento*/
        ctrl.formularioUsuarios = {};

        /* Lista de establecimientos que usamos para las sugerencias en Establecimientos (o) */
        ctrl.establecimientos = [];

        /* Por defecto, el componente Oficina (ou) no es obligatorio pues no sabemos si hay datos disponibles para sugerir */
        ctrl.requerirOficina = false;
        /* Lista de establecimientos que mostramos como sugerencias al usuario para el campo Establecimientos (o) */
        ctrl.establecimientos = [];
        /* Acá guardamos el contenido original de ctrl.corpus recibido mediante bindings, y al que no modificamos en el trancurso de la aplicación */
        ctrl.usuarioOriginal = {};
        /* TODO: Acá guardamos el contenido original de ctrl.usuarioDetalle recibido mediante bindings, y al que no modificamos en el trancurso de la aplicación */
        ctrl.usuarioDetalleOriginal = {};
        
        /* Inicializando el componente. Recuerda que todo $http pertenece naturalmente a este lugar */
        ctrl.$onInit = function(){

            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http({method: 'GET', url: '/api/helpers_establecimientos.json'}).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    console.log("Hay un problema con el servidor en este punto");
                });

        };

        /* Capturo mejor los cambios en los datos que componentes superiores nos envían mediante bindings */
        ctrl.$onChanges = function(){
            /* Obtenemos usuario desde componente padre, mediante el binding corpus */
            ctrl.usuario = ctrl.corpus; 
            ctrl.usuarioDetalle = ctrl.corpusDetalle;
           
           /* Es capaz de almacenar el objecto seleccionado en Establecimiento (o), o de inicializar su valor en el formulario */
            ctrl.establecimiento = angular.copy(ctrl.usuario.o); 

            /* Convertimos el atributo fecha a algo que el input="date" sea capaz de entender 
             * Hasta ahora, una fecha inválida (Valores null, por ejemplo), no causa nada tan malo
             * */
            ctrl.usuarioDetalle.fecha = new Date(ctrl.usuarioDetalle.fecha);

            /* Inicializa | almacena el objeto seleccionado en Oficina (ou) */
            ctrl.oficina =  angular.copy(ctrl.usuario.ou);
        
            /* Almacenamos el modelo, así podremos resetear el formulario de ser necesario */
            ctrl.usuarioOriginal = angular.copy(ctrl.usuario);
        }
       
        /*
         * Empiezan las operaciones helpers
         *
         * /
        
        /* Usada en seleccionaEstablecimiento, llenamos las sugerencias de oficinas con las propias del establecimiento */
        var obtenerOficinas = function(oficina){
            $http({method: 'GET', url: '/api/helpers_oficinas/' + oficina + '.json'}).
                then(function(respuesta){
                    ctrl.oficinas = respuesta.data;
                    /* Sólo si hay datos de la oficina tiene sentido que llenar el componente sea obligatorio */
                    ctrl.requerirOficina = (ctrl.oficinas.length > 0) ? true : false;
                }, function(respuesta){
                    /* Hubo un error, creo que algo podríamos hacer en este punto */
                    ctrl.requerirOficina = false;
                    /* Que de hecho no será tan necesario cuando esto este bien hecho */
                    ctrl.oficinas = [];
                });

        };


        /*
         * Empezamos a trabajar en la funcionalidad de los componentes
         *
         */

        /* Hay controles que se muestran según el binding accion, que especifica para que se usará el formulario */
        ctrl.mostrarCampos = function(clave){
            if (ctrl.accion === "creacion" && (clave ==="zimbra" || clave ==="samba" || clave ==="username" )){
                return true;
            } else if (ctrl.accion === "edicion" && (clave ==="zimbra" || clave ==="samba" )){
                return true;
            } else if (ctrl.accion === "actualizacion" && (clave === "recuperacion")){
                return true;
            } else {
                return false;
            }
        }
       
        /* En edicion, un campo siempre es requerido cuando antes alguien ya le había asignado un valor.
         * Reviso contra usuarioOriginal porque no lo hemos manipulado de ninguna forma en el curso de toda la aplicación
         * */
        var campoPreviamenteConfigurado = function(campo){
            return ctrl.usuarioDetalleOriginal[campo] ? true : false;
        };

        /* Establecemos la obligatoriedad de los controles que no lo son siempre */
        ctrl.requerirCampo = function(campo){
            var controlesCreacion = [];
            var controlesEdicion = ['dui', 'nit', 'jvs', 'fecha', 'title'];
            var controlesActualizacion = ['dui', 'nit', 'jvs', 'fecha', 'title'];
            if (ctrl.accion == "creacion" && ( controlesCreacion.indexOf(campo) >= 0)){
                return true;
            }else if(ctrl.accion == "edicion" && ( controlesEdicion.indexOf(campo) >= 0)){    
                return campoPreviamenteConfigurado(campo);
            }else if(ctrl.accion == "actualizacion" && ( controlesActualizacion.indexOf(campo) >= 0)){
                return true;
            };

            return false;
        }


        /* Le devolvemos un pequeño objeto con los mensajes que debe mostrar para cada situación */
        ctrl.jtSwitchMensajes = function(nombre){
            return __ENV.jtSwitch[nombre];
        }

        /* Funcionalidad para cambiar el estado de jt-switch */
        ctrl.actualizaJtSwitch = function(modelo, estado) {
            console.log(modelo);
            /* El único caso es jvs, que es un objeto donde guardamos dos datos */
            if ('estado' in ctrl.usuarioDetalle[modelo]){
                ctrl.usuarioDetalle[modelo]['estado'] = estado;
            } else {
                ctrl.usuarioDetalle[modelo] = estado;
            }
        }
        
        /* Callback para selected-object de angucomplete-alt que permite tratar mejor al elemento seleccionado en Establecimiento (o)  */
        ctrl.seleccionaEstablecimiento = function(seleccionado){
            if (seleccionado){
                ctrl.establecimiento = seleccionado.originalObject;
                obtenerOficinas(ctrl.establecimiento.id);
            };
        };

        /* Callback para select-object de angucomplete-alt para elemento seleccionado de Oficina (ou) */
        ctrl.seleccionaOficina = function(seleccionado){
            if (seleccionado){
                ctrl.oficina = seleccionado.originalObject.nombre;
            };
        };
 
        /* La funcionalidad en ng-click de button cancelar */
        ctrl.reiniciar = function(){
            ctrl.formularioUsuarios.$setUntouched();
            ctrl.usuario = angular.copy(ctrl.usuarioOriginal);
            ctrl.usuario = angular.copy(ctrl.usuarioDetalleOriginal);
        };

        /* 
         * Funcionalidad asociada con submit del formulario, que requiere enviar los datos del formulario hacia un nivel padre 
         * También se ocupa de asociar ctrl.establecimiento y ctrl.oficina al objeto que enviamos como usuario
         *
         * */
        ctrl.enviar = function(usuario, usuarioDetalle){
            console.log('Envío desde el componente que especifica al formulario: jt-formulario-usuario');
            usuario.o = ctrl.establecimiento;
            /* Si oficina no es requerida por no haber sugerencias. el usuario puede escribir cualquier cosa o borrar el contenidos,
             * así que habría que revisar directamente el control 
             *
             * */
            usuario.ou = ctrl.requerirOficina ? ctrl.oficina : ctrl.formularioUsuarios.ou.$modelValue;
            console.log(usuario);
            ctrl.ejecucion({'corpus': usuario, 'corpusDetalle': usuarioDetalle});
        }
        
    },

    bindings: {
        corpus: '<',
        corpusDetalle: '<',
        accion: '<',
        grupos: '<',
        ejecucion: '&'
    }
})
