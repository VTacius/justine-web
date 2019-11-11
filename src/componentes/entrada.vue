<template>
    <div class="componente">
        <div class="elemento">
            <label :for="uid">{{etiqueta}} <span v-if="!valido">Es inválido</span></label>
        </div>
        <div class="elemento">
            <input type="text" :id="uid" :name="uid" :placeholder="etiqueta" v-model="valor" @change="cambios($event)" autocomplete="off">
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" :valor-viejo="guarnecido" @vt-validar="validar">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
</template>
<script>
import vtValidacion from './VtValidacion.vue';

export default {
    name: 'vt-entrada',
    components: { vtValidacion },
    props: ['uid', 'etiqueta', 'modelo', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo,
            guarnecido: this.modelo,
            valido: true
        };
    },
    watch:{
        modelo: function(valor){
            this.valor = valor;
        }
    },
    methods: {
        validar: function(validacion){
            this.valido = validacion;
            this.$emit('vt-cambio', this.uid, this.valor, this.valido);
        },
        cambios: function(evento){
            this.valor = evento.target.value;
        }
    }
};

</script>
<style lang="scss" scoped>
    @import "@/sass/variables.scss";
    input[type="text"] {
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
</style>