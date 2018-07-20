<script>
import vtValidacion from './validacion.vue';

export default {
    name: 'vt-entrada',
    components: {vtValidacion},
    props: ['uid', 'etiqueta', 'modelo', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo
        }
    },
    
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <input type="text" class="pure-u-1" v-bind:id="uid" v-bind:name="uid" placeholder="Nombre" v-model="valor" v-on:change="$emit('vt-cambio', $event, valor)">
        <vt-validacion v-bind:uid="uid" v-bind:validaciones="validaciones" v-bind:valor="valor">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="sustantivo"><slot name="sustantivo"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
            <template slot="dui"><slot name="dui"></slot></template>
            <template slot="nit"><slot name="nit"></slot></template>
        </vt-validacion>
    </div>
    
</template>