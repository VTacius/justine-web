<script>
import { Validar } from './../utils/validacion.js';

export default {
    name: 'vt-validacion',
    props: ['uid', 'valor', 'validaciones'],
    data: function(){
        return {
            valido: {}
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
        valor: function (val){
            this.validaciones.forEach(function(validacion){
                /** TODO: Verificar que la verificación exista */
                let verifica = this[validacion];
                this.valido[validacion] = verifica(val)
            },this);
        }
    },
    methods: {
        /** Verdadero cuando no pasen la verificación */
        requerido: function(valor){
            /** Verifica que un array tenga valores */
            return valor.length === 0
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
            let re = /^(?:[A-Z][a-záéíóú]+\s{0,1})*$/;
            return ! re.test(valor);
        },
        existente: function(valor){
            /** TODO: Es posible que por ahora no tenga muy en claro como hacer este */
            return false
        },
        fecha: function(valor){
            let fecha = Date.parse(valor);
            return ! isNaN(fecha)
        }
    }
}
</script>
<template>
    <div> <!-- Acá un ng-show si el formulario ha sido enviado o el elemento ya usado -->
        <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-for="v in validaciones" v-bind:key="v" v-if="valido[v]"> 
            <i class="fa fa-exclamation-triangle" v-bind:name="v"></i><slot v-bind:name="v">{{v}}: Verifique el campo</slot>
        </label> 
    </div>
</template>