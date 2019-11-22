<template>
    <div class="validacion"> <!-- Acá un ng-show si el formulario ha sido enviado o el elemento ya usado -->
        <label v-bind:for="uid" v-for="v in this.invalidaciones" v-bind:key="v"> 
            <i class="fa fa-exclamation-triangle" v-bind:name="v"></i>
            <slot v-bind:name="v"><span class="clave">{{v}}:</span> Verifique el campo</slot>
        </label> 
    </div>
</template>
<script>
import Validacion from "./validaciones";

export default {
    name: 'VtValidacion',
    props: {
        'uid': String, 
        'valor': [Number, String, Array], 
        'errores': {
            type: Array,
            default: function(){
                return [];
            },
        },
        'validaciones': {
            type: Array,
            default: function(){
                return [];
            },
        },
    },
    mounted: function(){
        this.v = new Validacion(this.validaciones);
    },
    data: function(){
        return {
            v: Validacion,
            invalido: true,
            invalidaciones: [],
        };
    },
    
    watch: {
        valor: function (valor){
            /*console.log(valor);*/
            this.invalido = this.v.validar(valor);
            this.invalidaciones = this.v.errores;
            this.$emit('validar', valor, this.invalido);
        },
        errores: function(valor){
            this.invalidaciones= valor;
        }
    },
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