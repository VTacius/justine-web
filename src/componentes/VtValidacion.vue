<template>
    <div class="validacion"> <!-- Acá un ng-show si el formulario ha sido enviado o el elemento ya usado -->
        <label v-bind:for="uid" v-for="v in this.invalidaciones" v-bind:key="v"> 
            <i class="fa fa-exclamation-triangle" v-bind:name="v"></i>
            <slot v-bind:name="v"><span class="clave">{{v}}:</span> Verifique el campo</slot>
        </label> 
    </div>
</template>
<script>
import moment from 'moment';

export default {
    name: 'VtValidacion',
    props: {
        'uid': String, 
        'valor': [Number, String, Array], 
        'valorViejo': [Number, String, Array],
        'validaciones': {
            type: Array,
            default: function(){
                return [];
            }
        }
    },
    data: function(){
        return {
            invalidaciones: [],
            invalido: true
        };
    },
    mounted: function(){
        console.log('montado');
        this.invalido = this.validar(this.valor);
        console.log(`validacion: Veredicto: ${this.valor} es ${this.invalido} `);
        this.$emit('vt-validar', this.invalido, this.valor);
    },
    
    watch: {
        valor: function (valor){
            console.log('watch');
            this.invalido = this.validar(valor);
            console.log(`validacion: Veredicto: ${valor} es ${this.invalido} `);
            this.$emit('vt-validar', this.invalido, valor);
        }
    },

    methods: {
        validar: function(valor){
            console.log('validacion: Recibo a ' + this.uid + ' con valor ' + valor);
            this.invalidaciones = this.validaciones.filter(this.efectuarValidacion(valor, this));
            return this.validaciones.length > 0;
        },
        
        efectuarValidacion: (valor, vm) => (validacion) => {
            console.log('Validando ' + validacion);
            let metodoVerificar = vm[validacion];
            if (typeof metodoVerificar === 'function'){
                return metodoVerificar(valor, vm.valorViejo);
            } else {
                return false;
            }
        },

        /** 
         * Devuelven true cuando no pasan la validación
         */
        
        /** Verifica que un array tenga valores */
        requerido: function(){
            let [valor] = arguments;
            return typeof(valor) === 'undefined' || valor.length === 0;
        },

        nit: function(){
            let [valor] = arguments;
            let re = /^(\d{4}-\d{6}-\d{3}-\d{1}$)*$/;
            return ! re.test(valor);
        },

        dui: function(){
            let [valor] = arguments;
            let re =  /^(\d{8}-\d{1})*$/;
            return ! re.test(valor);
        },

        sustantivo: function(){
            let [valor] = arguments;
            let re = /^(?:[A-Z][a-záéíóúñ]+\s{0,1})*$/;
            return ! re.test(valor);
        },

        existente: function(){
            let [valor, valorViejo] = arguments;
            if (!this.requerido(valorViejo)){
                return this.requerido(valor);
            } else {
                return false;
            }
        },

        fecha: function(){
            let [valor] = arguments;
            if (valor.length > 0){
                let momento = moment(valor, 'DD/MM/YYYY');
                return ! momento.isValid();
            }

        },

        telefono: function(){
            let [valor] = arguments;
            if(valor.length > 0){
                let re = /^[0-9]+(?:\s|-){0,3}[0-9]+$/;
                return ! re.test(valor);
            }
            return false;
        },

    }
};
</script>

<style scoped>
    label {
        display: block;
        width: 100%;
        margin-top: 0.45em;
        font-size: 80%;
        color: #dc3545;
    }
    
    .validacion{
        letter-spacing: normal;
    }
    
    .fa{
        float: left;
        margin-right: 0.46em;
    }
    
    span {
        float: left;
        width: 4.6em;
    }

</style>