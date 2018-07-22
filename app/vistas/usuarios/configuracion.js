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
        validacion: ['requerido', 'existente', 'listado']
    },
    grupos:{
        validacion: ['requerido', 'existente']
    }
};

export { plantilla };