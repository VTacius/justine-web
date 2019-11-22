<template>
    <div>
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

</style>