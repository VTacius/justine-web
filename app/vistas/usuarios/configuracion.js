var plantilla = {
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
        validacion: ['requerido', 'existente']
    },
    ou:{
        validacion: []
    },
    grupo:{
        validacion: []
    },
    grupos:{
        validacion: []
    },
    title:{
        validacion: []
    },
    telephoneNumber: {
        validacion: []
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

let nuevo = Object.assign({}, plantilla);
let edicion = Object.assign({}, plantilla);
let edicionUsuario = Object.assign({}, plantilla);

/**
 * Componentes
 */
edicionUsuario.componentes.zimbra.mostrar = false;
edicionUsuario.componentes.samba.mostrar = false;
edicionUsuario.componentes.recuperacion.mostrar = false;

export { nuevo, edicion, edicionUsuario };