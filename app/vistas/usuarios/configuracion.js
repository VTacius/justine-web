var errorPlantilla = {
    requerido: false,
    sustantivo: false,
    existente: false
};

var plantilla = {
    uid: {
        valor: "",
        error: errorPlantilla,
        validacion: ["requerido"]
    },
    givenName: {
        valor: "",
        error: errorPlantilla,
        validacion: ["requerido", "sustantivo"]
    },
    sn: {
        valor: "",
        error: errorPlantilla,
        validacion: ["requerido", "sustantivo"]
    },
    dui: {
        valor: "",
        error: errorPlantilla,
        validacion: ["existente"]
    },
    nit: {
        valor: "",
        error: errorPlantilla,
        validacion: ["existente"]
    },
    jvs: {
        valor: "",
        error: errorPlantilla,
        validacion: ["existente"]
    }
}
