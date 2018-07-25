var plantilla = {
    givenName: {
        validacion: ['requerido', 'sustantivo', 'existente']
    },
    sn: {
        validacion: ['requerido', 'sustantivo', 'existente']
    },
    dui: {
        validacion: ['requerido', 'dui', 'existente']
    },
    nit: {
        validacion: ['requerido', 'nit', 'existente']
    },
    jvs: {
        validacion: ['existente']
    },
    fecha: {
        validacion: ['requerido', 'fecha', 'existente']
    },
    o:{
        validacion: ['listado']
    },
    ou:{
        validacion: ['listado']
    },
    grupo:{
        validacion: ['listado', 'requerido', 'existente']
    },
    grupos:{
        validacion: ['requerido', 'existente']
    },
    title:{
        validacion: ['existente']
    },
    telephoneNumber: {
        validacion: ['telefono', 'existente']
    },
    pregunta: {
        validacion: ['existente']
    },
    respuesta: {
        validacion: ['existente']
    },
    loginShell: {
        validacion: ['requerido']
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

export { plantilla };