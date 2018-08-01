<script>
import moment from 'moment';

export default {
    name: 'vt-validacion',
    props: {
        'uid': String, 
        'valor': [Number, String, Array], 
        'valorViejo': [Number, String, Array],
        'validaciones': {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    data: function(){
        return {
            valido: {},
            invalido: true
        }
    },
    mounted: function (){
        let valores = {};
        this.validaciones.forEach(function(elemento){
            return valores[elemento] = false;
        });
        this.valido = valores;

    },
    watch: {
        valor: function (valor){
            console.log('validacion: Valor en ' + this.uid + ' cambió a ' + valor)
            /** Reseteamos el valor con cada verificación */
            this.invalido = true;
            this.validaciones.forEach(function(validacion){
                if (validacion === 'existente'){
                    this.valido[validacion] = this.existente(valor, this.valorViejo)
                    /** ¿Debo incluir valor viejo al emitir? */
                } else {
                    let verifica = this[validacion];
                    /** TODO: Verificar que la verificación exista */
                    this.valido[validacion] = verifica(valor)
                }
                /** 
                 * Inválido es falso si todos las verificaciones son falsas.
                 * Los cambiamos a true para hacer esto en una sola instrucción
                 */
                this.invalido = this.invalido && (! this.valido[validacion])
            },this);

            console.log('validacion: Veredicto es ' + this.invalido + ' ' + valor);
            /** He terminado de validar, emito el resultado y el valor que se he validado */
            this.$emit('vt-validar', this.invalido, valor) 
        }
    },
    methods: {
        /** 
         * Devuelven true cuando no pasan la validación
         */
        
        /** Verifica que un array tenga valores */
        requerido: function(valor){
            return typeof(valor) === "undefined" || valor.length === 0
        },

        nit: function(valor){
            let re = /^(\d{4}-\d{6}-\d{3}-\d{1}$)*$/;
            return ! re.test(valor);
        },

        dui: function(valor){
            let re =  /^(\d{8}-\d{1})*$/;
            return ! re.test(valor);
        },

        sustantivo: function(valor){
            let re = /^(?:[A-Z][a-záéíóúñ]+\s{0,1})*$/;
            return ! re.test(valor);
        },

        existente: function(valor, valorViejo){
            if (!this.requerido(valorViejo)){
                return this.requerido(valor);
            } else {
                return false
            }
        },

        fecha: function(valor){
            if (valor.length > 0){
                let momento = moment(valor, 'DD/MM/YYYY');
                return ! momento.isValid();
            }

        },

        telefono: function(valor){
            if(valor.length > 0){
                /** TODO: Probablemente querrás permitir espacios entre */
                let re = /^(?:[0-9]+\-?){2}$/;
                return ! re.test(valor);
            }
            return false;
        },

    }
}
</script>
<template>
    <div class="pure-u-1"> <!-- Acá un ng-show si el formulario ha sido enviado o el elemento ya usado -->
        <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-for="v in validaciones" v-bind:key="v" v-if="valido[v]"> 
            <i class="fa fa-exclamation-triangle" v-bind:name="v"></i><slot v-bind:name="v">{{v}}: Verifique el campo</slot>
        </label> 
    </div>
</template>