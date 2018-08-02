let plantilla = function(){
    return {
        givenName: {
            validacion: ['requerido', 'sustantivo']
        },
        sn: {
            validacion: ['requerido', 'sustantivo']
        },
        dui: {
            validacion: ['dui']
        },
        nit: {
            validacion: ['nit']
        },
        jvs: {
            validacion: []
        },
        fecha: {
            validacion: ['fecha']
        },
        o:{
            validacion: ['requerido']
        },
        ou:{
            validacion: []
        },
        grupos:{
            validacion: []
        },
        grupo:{
            validacion: []
        },
        title:{
            validacion: []
        },
        telephoneNumber: {
            validacion: []
        },
        uid: {
            validacion: [],
            mostrar: false
        },
        pregunta: {
            validacion: []
        },
        respuesta: {
            validacion: []
        },
        loginShell: {
            validacion: []
        },
        buzonVolumen: {
            validacion: []
        },
        componentes: {
            samba: {
                mostrar: true,
            },
            recuperacion: {
                mostrar: true,
            },
            zimbra: {
                mostrar: true,
            }
        }

    };
};

let nuevo = new plantilla();
let edicion = new plantilla();
let edicionUsuario = new plantilla();

/** 
 * DUI:
 * No obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con edicionUsuario siempre es obligatorio
 */
edicion.dui.validacion.push('existente');
edicionUsuario.dui.validacion.push('requerido');

/** 
 * NIT:
 * No obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con edicionUsuario siempre es obligatorio
 */
edicion.nit.validacion.push('existente');
edicionUsuario.nit.validacion.push('requerido');

/**
 * JVS
 * TODO: Quizá la validación del componente debería ser activada con un control a la mano de él. Tal como lo habías pensado
 * No obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con edicionUsuario es obligatorio cuando ha sido configurado antes
 */
edicion.jvs.validacion.push('existente');
edicionUsuario.jvs.validacion.push('existente');

/**
 * Fecha
 * No obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con edicionUsuario siempre es obligatorio 
 */
edicion.fecha.validacion.push('existente');
edicionUsuario.fecha.validacion.push('requerido');

/**
 * Establecimiento
 * Siempre es obligatorio, así que ya esta hecho desde la plantilla
 */


/**
 * Oficina
 * Obligatorio cuando haya datos que mostrar. TODO: Implementarle
 */

/**
 * Cargo
 * No obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con edicionUsuario siempre es obligatorio 
 */
edicion.title.validacion.push('existente');
edicionUsuario.title.validacion.push('requerido');

/**
 * Teléfono 
 * No obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio
 */
edicion.telephoneNumber.validacion.push('existente');
edicionUsuario.telephoneNumber.validacion.push('requerido');

/**
 * Username
 * 
 * Obligatorio cuando aparece en "creacion"
 */
nuevo.uid.validacion.push('requerido');
nuevo.uid.mostrar = true;

/**
 * Grupos Adicionales 
 * Obligatorio siempre, ya que del listado escogido depende el Principal
 * El control no deja borrar el último, así que por necesidad habrá que escoger uno.
 * Bastará validar entonces que haya escogido en creación, no veo la necesidad de validarlo despues
 */
nuevo.grupos.validacion.push('requerido');

/**
 * Grupo Principal 
 * Obligatorio siempre. El control no escoge nada por defecto, así que de eliminar su grupo principal 
 * actaul del control 'Grupos adicionales', le dejaría sin nada
 */
nuevo.grupo.validacion.push('requerido');
edicion.grupo.validacion.push('requerido');

/**
 * Shell por defecto 
 * Obligatorio en creación, además, ponemos un valor /bin/false por defecto
 * TODO: Un control vt-switch debería considerarse
 */
nuevo.loginShell.validacion.push('requerido');

/**
 * Pregunta Secreta 
 * Obligatorio edicionUsuario
 */
edicionUsuario.pregunta.validacion.push('requerido');

/**
 * Respuesta 
 * Obligatorio en edicionUsuario 
 */
edicionUsuario.respuesta.validacion.push('requerido');

/**
 * Estado del buzón
 * TODO: ¿Por defecto habilitado? 
 */

/**
  * Estado de la cuenta
 * TODO: ¿Por defecto habilitado? 
  */

/**
 * Tamaño del buzón
 * Es obligatorio
 * TODO: Un proyecto de conversor es requerido. Calculo que podría ser algo bastante entretenido
 */
nuevo.buzonVolumen.validacion.push('requerido');
edicion.buzonVolumen.validacion.push('requerido');

/**
 * Recuperación de contraseña:
 * Lo ocultamos a la hora de crear un nuevo usuario
 */
nuevo.componentes.recuperacion.mostrar = false;
edicion.componentes.recuperacion.mostrar = false;

/**
 * Atributos Posix y Samba
 * Lo ocultamos de cara a la edición de sus datos por el propio usuario
 */
edicionUsuario.componentes.samba.mostrar = false;

/**
 * Atributos Zimbra
 * Lo ocultamos de cara a la edición de sus datos por el propio usuario
 */
edicionUsuario.componentes.zimbra.mostrar = false;

export { nuevo, edicion, edicionUsuario };
