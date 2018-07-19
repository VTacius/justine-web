<script>
import vtValidacion from './validacion.vue';

export default {
    name: 'vt-multiautocompleta',
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'validaciones'],
    components: { vtValidacion },
    data: function(){
        return {
            valor: this.modelo
        }
    }
}   
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{this.etiqueta}}</label>
        <select multiple class="pure-u-1" v-bind:id="uid" v-bind:name="uid" size=10 v-model="valor" >
            <option v-for="option in datos" v-bind:key="option.value" v-bind:value="option.value">
                {{option.label}}
            </option>
        </select>
        <vt-validacion v-bind:uid="uid" v-bind:validaciones="validaciones" v-bind:valor="valor">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
        </vt-validacion>
    </div>
</template>