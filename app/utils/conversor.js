function Conversor(){

}

/**
 * TODO: Lo más probable es que tengás que seguir con este proyecto. 
 * Después de este, deberías parsear el contenido para hacer precisamente la conversión
 * 
 */

Conversor.prototype.convertir = function(valor, tipo){
    this.valor = valor;
    this.tipo = tipo;

    let resultado = 0; 
    if (tipo in this){
        let conversar = this[tipo];
        resultado = conversar(valor);
    }
   
    return resultado;
};

Conversor.prototype.almacenamiento = function(valor){
    let resultado = this.mebibyte(valor);
    return (resultado >= 1024 ) ? resultado / 1024 : resultado;
};

Conversor.prototype.mebibyte = function(valor){
    return valor / 1048576;
};

export { Conversor };