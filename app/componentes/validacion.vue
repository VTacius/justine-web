<script>
import { Validar } from './../utils/validacion.js';
import moment from 'moment';

export default {
    name: 'vt-validacion',
    props: {
        'uid': String, 
        'valor': [Number, String, Array], 
        'validaciones': Array,
        'datos': {
            default: function(){
                return ['']
            },
            type: Array
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
            this.invalido = true;
            this.validaciones.forEach(function(validacion){
                /** TODO: Verificar que la verificación exista */
                if (validacion === "listado" && valor.length > 0){
                    valor = this.encontrarElemento(valor, this.datos);
                    this.valido[validacion] = this.requerido(valor);
                } else{
                    let verifica = this[validacion];
                    this.valido[validacion] = verifica(valor)
                }
                this.invalido = this.invalido && (! this.valido[validacion])
            },this);
           this.$emit('vt-validar', !this.invalido, valor) 
        }
    },
    methods: {
        /** Verdadero cuando no pasen la verificación */
        requerido: function(valor){
            /** Verifica que un array tenga valores */
            return typeof(valor) === "undefined" || valor.length === 0
        },
        nit: function(valor){
            /** TODO: Revisalo y verifica que valide tanto en UNA cadena correcta como en valor nulo */
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
        existente: function(valor){
            /** TODO: Es posible que por ahora no tenga muy en claro como hacer este */
            return false
        },
        fecha: function(valor){
            if (valor.length > 0){
                let momento = moment(valor, 'DD/MM/YYYY');
                return ! momento.isValid();
            }

        },
        encontrarElemento: function(valor, lista){
            return lista.find(function(item){
                return (item.label == valor || item.value == valor); 
            });
        },
        listado: function(valor, lista){
            if (valor.length > 0){
                return this.encontrarElemento(valor, lista);
            }
        }
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