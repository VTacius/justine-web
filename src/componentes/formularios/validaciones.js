import moment from 'moment';

class Validacion {

    constructor (validaciones, valorInicial){
        this.validaciones = validaciones;
        this.valorInicial = valorInicial;
        this.errores = [];
    }

    validar(valor){
        this.errores = this.validaciones.filter(this.efectuarValidacion(valor, this));
        return this.errores.length === 0;
    }
    
    efectuarValidacion (valor, vm) {
        return (validacion) => {
            let metodoVerificar = vm[validacion];
            if (typeof metodoVerificar === 'function'){
                return metodoVerificar(valor, vm.valorInicial);
            } else {
                return false;
            }

        };
    }

    /** 
     * Devuelven true cuando no pasan la validación
     */
    
    /** Verifica que un array tenga valores */
    requerido(){
        let [valor] = arguments;
        return typeof(valor) === 'undefined' ||  valor === '' || valor.length === 0;
    }

    nit(){
        let [valor] = arguments;
        let re = /^(\d{4}-\d{6}-\d{3}-\d{1}$)*$/;
        return ! re.test(valor);
    }

    dui(){
        let [valor] = arguments;
        let re =  /^(\d{8}-\d{1})*$/;
        return ! re.test(valor);
    }

    sustantivo(){
        let [valor] = arguments;
        let re = /^(?:[A-Z][a-záéíóúñ]+\s{0,1})*$/;
        return ! re.test(valor);
    }

    existente () {
        let [valor, valorViejo] = arguments;
        if (!this.requerido(valorViejo)){
            return this.requerido(valor);
        } else {
            return false;
        }
    }

    fecha(){
        let [valor] = arguments;
        if (valor.length > 0){
            let momento = moment(valor, 'DD/MM/YYYY');
            return ! momento.isValid();
        }

    }

    telefono(){
        let [valor] = arguments;
        if(valor.length > 0){
            let re = /^[0-9]+(?:\s|-){0,3}[0-9]+$/;
            return ! re.test(valor);
        }
        return false;
    }

}

export default Validacion;