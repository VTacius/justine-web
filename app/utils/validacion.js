function Validar (plantilla, datos){
    /* La plantilla configura la forma en que se comporta el validador */
    this.plantilla = plantilla;
    this.datos = datos;
}

Validar.prototype.verificar = function(clave, valor){
    
    var ambito = this;

    var validaciones = (clave in this.plantilla === true)? this.plantilla[clave].validacion: [''];

    validaciones.forEach(function(elm){
        if (elm in Validar.prototype === true){
            ambito[elm](clave, valor);
        }
    });
};

Validar.prototype.nulo = function(valor){
    return (typeof(valor.valor) === null || 
       valor.valor === ''); 
};

Validar.prototype.requerido = function(clave, valor){
    if (typeof(valor.valor) === null || valor.valor === ''){
        valor.error.requerido = true;
    } else {
        valor.error.requerido = false;
    }
};

Validar.prototype.sustantivo = function(clave, valor){
    if (valor.valor.match(/^[a-zA-Z\sáéíóúñ]+$/) === null){
        valor.error.sustantivo = true;
    } else {
        valor.error.sustantivo = false;
    }
};

Validar.prototype.existente = function(clave, valor){
    if (clave in this.datos === true && this.nulo(valor)){
        valor.error.existente = true;
    } else {
        valor.error.existente = false;
    }
}; 

export { Validar };