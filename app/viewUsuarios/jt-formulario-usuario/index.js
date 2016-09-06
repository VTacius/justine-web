'use strict';

angular.module('justineApp').
component('jtFormularioUsuario', {
    templateUrl: 'viewUsuarios/jt-formulario-usuario/index.html',
    controller: function (__ENV, $http) {
        var ctrl = this;
        
        /* Volumen del Buzón: Debería ser configurable desde al menos el componente superior */
        ctrl.volumenes = [{id: 300, name: '300MB'}, {id: 500, name: '500MB'}, {id: 750, name: '750MB'}];
        /* Titulo en butón enviar: Debería ser configurable desde al menos el componente superior */
        ctrl.mensajeBoton = {'creacion': 'Creación', 'edicion': 'Editar', 'actualizacion': 'Actualizacion'}

        /* Configuro al elemento jt-alerta. TODO: Sigo sin resolver si esta vez no mostraremos más de uno */
        ctrl.alerta = {};

        /* Hacemos que el formulario este disponible en este ambito */
        ctrl.formularioUsuarios = {};

        /* Por defecto, el componente Oficina (ou) no es obligatorio pues no sabemos si hay datos disponibles para sugerir */
        ctrl.requerirOficina = false;

        /* Lista de establecimientos que usamos para las sugerencias en Establecimientos (o) */
        ctrl.establecimientos = [];

        /* Acá guardamos el contenido original de ctrl.corpus recibido mediante bindings, y al que no modificamos en el 
            trancurso de la aplicación */
        ctrl.usuarioOriginal = {};
        
        /* Acá guardamos el contenido original de ctrl.usuarioDetalle recibido mediante bindings, y al que no modificamos 
            en el trancurso de la aplicación */
        ctrl.usuarioDetalleOriginal = {};
        
        /* Inicializando el componente. Recuerda que todo $http pertenece naturalmente a este lugar */
        ctrl.$onInit = function(){

            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http.get(__ENV['api']['helpers']['establecimientos']).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    console.log(respuesta);
                    ctrl.alerta.titulo = 'El servidor acaba de devolver una mensaje con el siguiente contenido:';
                    ctrl.alerta.mensaje = null;
                    ctrl.alerta.codigo = respuesta.status;
                    ctrl.alerta.tipo = 'error';
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
             * PERO NO SIGNIFICA QUE DEBA CONFIGURARSE UN ATRIBUTO INVALID, SO MAJE
             * */
            
            var fecha = new Date(ctrl.usuarioDetalle.fecha);
            if ('fecha' in ctrl.usuarioDetalle){
                ctrl.usuarioDetalle.fecha = new Date(ctrl.usuarioDetalle.fecha);
            }else{
                delete ctrl.usuarioDetalle.fecha;
            }

            /* Inicializa | almacena el objeto seleccionado en Oficina (ou) */
            ctrl.oficina =  angular.copy(ctrl.usuario.ou);
        
            /* 
             * Almacenamos el modelo, así podremos resetear el formulario de ser necesario
             * Almacenamos después de una posible validación de datos  
             *
             * */
            ctrl.usuarioOriginal = angular.copy(ctrl.usuario);
            ctrl.usuarioDetalleOriginal = angular.copy(ctrl.usuarioDetalle);
        }
       
        /*
         * Empiezan las operaciones helpers
         *
         * /
        
        /*
         * La cuestión es que algunos controles se empeñan en enviar datos aún cuando están vacíos, diversos motivos y tal 
         * TODO: Acá estamos viendo otro filtro bien bonito
         *
         */
        var validacionDatos = function(objeto){
            var datos = {};
            angular.forEach(objeto, function(valor, clave){
                if (angular.isObject(valor)){
                    if (valor.valor !== null){
                        datos[clave] = valor;
                    };
                }else if (angular.isString(valor)){
                    if (valor !== ""){
                        datos[clave] = valor;
                    }
                }else if (angular.isDefined(valor)) {
                    if (valor !== null){
                        datos[clave] = valor;
                    };
                };
            });
            return datos;
        };

        /* Usada en seleccionaEstablecimiento, llenamos las sugerencias de oficinas con las propias del establecimiento */
        var obtenerOficinas = function(establecimiento){
            $http.get(__ENV['api']['helpers']['oficinas'] + establecimiento).
                then(function(respuesta){
                    ctrl.oficinas = respuesta.data;
                    /* Sólo si hay datos de la oficina tiene sentido que llenar el componente sea obligatorio */
                    ctrl.requerirOficina = (ctrl.oficinas.length > 0) ? true : false;
                }, function(respuesta){
                    console.log(respuesta);
                    ctrl.requerirOficina = false;
                    ctrl.oficinas = [];
                });

        };

        /*
         * Empezamos a trabajar en la funcionalidad de los componentes
         *
         */

        /* Hay controles que se muestran según el binding accion, que especifica para que se usará el formulario */
        ctrl.mostrarCampos = function(clave){
            if (ctrl.accion === 'creacion' && (clave ==='zimbra' || clave ==='samba' || clave ==='username' )){
                return true;
            } else if (ctrl.accion === 'edicion' && (clave ==='zimbra' || clave ==='samba' )){
                return true;
            } else if (ctrl.accion === 'actualizacion' && (clave === 'recuperacion')){
                return true;
            } else {
                return false;
            }
        }
       
        /* Establecemos la obligatoriedad de los controles que no lo son siempre */
        ctrl.requerirCampo = function(campo){
            var controlesCreacion = [];
            var controlesEdicion = ['dui', 'nit', 'jvs', 'fecha', 'title', 'telephoneNumber'];
            var controlesActualizacion = ['dui', 'nit', 'jvs', 'fecha', 'title', 'telephoneNumber'];
            if (ctrl.accion == "creacion" && ( controlesCreacion.indexOf(campo) >= 0)){
                return true;
            }else if(ctrl.accion == "edicion" && ( controlesEdicion.indexOf(campo) >= 0)){    
                return angular.isDefined(ctrl.usuarioDetalleOriginal[campo]);
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
            /* El único caso es jvs, que es un objeto donde guardamos dos datos */
            if (angular.isObject(ctrl.usuarioDetalle[modelo])){
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
            ctrl.formularioUsuarios.$setPristine();
            ctrl.usuario = angular.copy(ctrl.usuarioOriginal);
            ctrl.usuarioDetalle = angular.copy(ctrl.usuarioDetalleOriginal);
        };

        /* 
         * Funcionalidad asociada con submit del formulario, que requiere enviar los datos del formulario hacia un nivel padre 
         * También se ocupa de asociar ctrl.establecimiento y ctrl.oficina al objeto que enviamos como usuario
         *
         * */
        ctrl.enviar = function(validacion, usuario, usuarioDetalle){
            if (validacion){
                console.log('Estoy a punto de enviar una actualización');
                usuario.o = ctrl.establecimiento;
                /* 
                 * Si oficina no es requerida por no haber sugerencias. el usuario puede escribir cualquier cosa o borrar el contenidos,
                 * así que habría que revisar directamente el contenido del control en busca de que asignar
                 *
                 */
                usuario.ou = ctrl.requerirOficina ? ctrl.oficina : ctrl.formularioUsuarios.ou.$modelValue;

                /* No vamos a enviar datos vacíos a niveles superiores, ellos ya no necesitan tratar esos problemas */
                var corpus = validacionDatos(usuario);
                var corpusDetalle = validacionDatos(usuarioDetalle);
                
                ctrl.ejecucion({'uid': usuario.uid, 'corpus': corpus, 'corpusDetalle': corpusDetalle});
            }else{
                console.log('No esta debidamente validado');
            }
            return;
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
