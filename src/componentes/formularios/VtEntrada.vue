<template>
    <div class="componente">
        <div>
            <label :for="uid">{{etiqueta}} <span v-show="!this.valido">Es inválido</span></label>
        </div>
        <div>
            <input :type="tipo" :id="uid" :name="uid" :placeholder="etiqueta" v-model="valor" autocomplete="off">
        </div>
        <vt-validacion :uid="uid" :valor="valor" :validaciones="validaciones" :errores="errores" v-on:validar="cambios">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>

</template>
<script>
import vtValidacion from './VtValidacion.vue';

export default {
    name: 'VtEntrada',
    components: { vtValidacion },
    props: {
        'uid': String, 
        'value': {
            type: String, 
            default: function(){
                return '';
            }
        },
        'errores': {
            type: Array,
            default: function(){
                return [];
            },
        },
        'etiqueta': String, 
        'validaciones': {
            type: Array, 
            default: function(){
                return [];
            } 
         },
         'password': Boolean,
    },
    data: function(){
        return {
            tipo: "text",
            valido: true,
            valor: this.value
        }
    },
    mounted: function(){
        this.tipo = this.password === true ? 'password' : 'text';
    },
    methods: {
        cambios: function(valor, valido){
            this.valido = valido;
            this.$emit('input', valor);
        }
    },
    watch: {
        errores: function(nuevo){
            this.valido = nuevo.length === 0;
        },
        value: function(nuevo){
            this.valor = nuevo;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/sass/variables.scss";
    input[type="text"],
    input[type="password"] {
        background-color: $color-fondo;
        min-height: 2.25rem;
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem 0.8rem 0.3rem 0.6rem;
        border: none;
        outline: none;
        box-shadow: none;
        border-bottom: solid 0.2rem $color-borde-input;
        border-bottom-left-radius: 0.15rem;
        border-bottom-right-radius: 0.15rem;
    }

    .componente {
        min-height: 5.36em;
    }
        

</style>