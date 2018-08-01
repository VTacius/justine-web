let plantilla = function(){
    return {
        hostname: {
            validacion: ['requerido']
        },
        descripcion: {
            validacion: ['requerido']
        }
    };
};

let nuevo = plantilla();

export { nuevo };