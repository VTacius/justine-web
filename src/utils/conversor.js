class Conversor {
    constructor() {
    }
    /**
     * TODO: Lo más probable es que tengás que seguir con este proyecto.
     * Después de este, deberías parsear el contenido para hacer precisamente la conversión
     *
     */
    convertir(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
        let resultado = 0;
        if (tipo in this) {
            let conversar = this[tipo];
            resultado = conversar(valor);
        }
        return resultado;
    }
    
    almacenamiento(valor) {
        let resultado = this.mebibyte(valor);
        return (resultado >= 1024) ? resultado / 1024 : resultado;
    }
    
    mebibyte(valor) {
        return valor / 1048576;
    }
}

export default { Conversor };