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

        /* "Declarar" el formulario en este punto permite manipularlo a este nivel. Por otra parte, parecía haber problemas 
            con el nombre en cierto momento*/
        ctrl.formularioUsuarios = {};

        /* Lista de establecimientos que usamos para las sugerencias en Establecimientos (o) */
        ctrl.establecimientos = [];

        /* Por defecto, el componente Oficina (ou) no es obligatorio pues no sabemos si hay datos disponibles para sugerir */
        ctrl.requerirOficina = false;

        /* Lista de establecimientos que mostramos como sugerencias al usuario para el campo Establecimientos (o) */
        ctrl.establecimientos = [];

        /* Acá guardamos el contenido original de ctrl.corpus recibido mediante bindings, y al que no modificamos en el 
            trancurso de la aplicación */
        ctrl.usuarioOriginal = {};
        
        /* TODO: Acá guardamos el contenido original de ctrl.usuarioDetalle recibido mediante bindings, y al que no modificamos 
            en el trancurso de la aplicación */
        ctrl.usuarioDetalleOriginal = {};
        
        /* Inicializando el componente. Recuerda que todo $http pertenece naturalmente a este lugar */
        ctrl.$onInit = function(){

            /* Obtenemos los establecimiento con los que vamos a llenar las sugerencias para Establecimientos (o) */
            $http.get(__ENV['api']['helpers']['establecimientos']).
                then(function(respuesta){
                    ctrl.establecimientos = respuesta.data;
                }, function(respuesta){
                    ctrl.alerta.titulo = 'El servidor acaba de devolver una mensaje con el siguiente contenido:';
                    ctrl.alerta.codigo = respuesta.status;
                    ctrl.alerta.tipo = 'error';
                }); 
        };

        /* Capturo mejor los cambios en los datos que componentes superiores nos envían mediante bindings */
        ctrl.$onChanges = function(){
            /* Obtenemos usuario desde componente padre, mediante el binding corpus */
            ctrl.usuario = ctrl.corpus; 
            ctrl.usuarioDetalle = ctrl.corpusDetalle;
          
             
            /*TODO: Aunque sea de hecho un caso aislado, necesitamos crear un filtro para estas cosas */ 
            /* Si el campo grupo no es de un entero, nada, borro la clave */
            /*if ('grupo' in ctrl.usuarioDetalle){
                var grupo = parseInt(ctrl.usuarioDetalle.grupo)
                if (grupo){
                    ctrl.usuarioDetalle['grupo'] = grupo;
                    console.log(grupo);
                } else {
                    console.log('Borraré', ctrl.usuarioDetalle['grupo']);
                    delete ctrl.usuarioDetalle['grupo'];
                } 
            };
            */
            /* Si algunos de los grupos adicionales no es un enteros, borro la clave completa */ 
            /*if ('grupos' in ctrl.usuarioDetalle){
                var grupos = [];
                angular.forEach(ctrl.usuarioDetalle.grupos, function(valor, clave){
                    var grupo = parseInt(valor)
                    if (grupo){
                        grupos.push(grupo);
                    }  
                });
                if (grupos.length === 0){
                    delete ctrl.usuarioDetalle['grupos'];
                }else{
                    ctrl.usuarioDetalle['grupos'] = grupos;
                    console.log(grupos);
                };
            };*/
            
            /* Es capaz de almacenar el objecto seleccionado en Establecimiento (o), o de inicializar su valor en el formulario */
            ctrl.establecimiento = angular.copy(ctrl.usuario.o); 

            /* Convertimos el atributo fecha a algo que el input="date" sea capaz de entender 
             * Hasta ahora, una fecha inválida (Valores null, por ejemplo), no causa nada tan malo
             * */
            ctrl.usuarioDetalle.fecha = new Date(ctrl.usuarioDetalle.fecha);

            /* Inicializa | almacena el objeto seleccionado en Oficina (ou) */
            ctrl.oficina =  angular.copy(ctrl.usuario.ou);
        
            /* 
             * Almacenamos el modelo, así podremos resetear el formulario de ser necesario
             * Almacenamos después de una posible validación de datos  
             *
             * */
            /* TODO: ¿Acaso no estamos guardando usuario detalle */
            ctrl.usuarioOriginal = angular.copy(ctrl.usuario);
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
        var obtenerOficinas = function(oficina){
            $http({method: 'GET', url: '/api/helpers_oficinas/' + oficina + '.json'}).
                then(function(respuesta){
                    ctrl.oficinas = respuesta.data;
                    /* Sólo si hay datos de la oficina tiene sentido que llenar el componente sea obligatorio */
                    ctrl.requerirOficina = (ctrl.oficinas.length > 0) ? true : false;
                }, function(respuesta){
                    /* Hubo un error, creo que algo podríamos hacer en este punto */
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
       
        /* En edicion, un campo siempre es requerido cuando antes alguien ya le había asignado un valor.
         * Reviso contra usuarioOriginal porque no lo hemos manipulado de ninguna forma en el curso de toda la aplicación
         * */
        var campoPreviamenteConfigurado = function(campo){
            return ctrl.usuarioDetalleOriginal[campo] ? true : false;
        };

        /* Establecemos la obligatoriedad de los controles que no lo son siempre */
        ctrl.requerirCampo = function(campo){
            var controlesCreacion = ['volumenBuzon'];
            var controlesEdicion = ['dui', 'nit', 'jvs', 'fecha', 'title', 'volumenBuzon'];
            var controlesActualizacion = ['dui', 'nit', 'jvs', 'fecha', 'title', 'volumenBuzon'];
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
            ctrl.usuario = angular.copy(ctrl.usuarioDetalleOriginal);
        };

        /* 
         * Funcionalidad asociada con submit del formulario, que requiere enviar los datos del formulario hacia un nivel padre 
         * También se ocupa de asociar ctrl.establecimiento y ctrl.oficina al objeto que enviamos como usuario
         *
         * */
        ctrl.enviar = function(validacion, usuario, usuarioDetalle){
            console.log('Envío desde el componente que especifica a jt-formulario-usuario');
            if (validacion){
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
                console.log('El componente formulario sólo envia datos cuando se esta validado');
            }
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
