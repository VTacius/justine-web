<script>
import vtValidacion from './validacion.vue';

export default {
    name: 'vt-multiautocompleta',
    components: { vtValidacion },
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo
        }
    },
    methods: {
        validar: function(evento, valor){
            this.$emit('vt-cambio', this.uid, this.valor, this.invalido);
        }
    }
}   
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" :for="uid">{{this.etiqueta}}</label>
        <select multiple class="pure-u-1" :id="uid" :name="uid" size=10 v-model="valor" >
            <option v-for="option in datos" :key="option.value" :value="option.value">
                {{option.label}}
            </option>
        </select>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" @vt-validar="validar">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
        </vt-validacion>
    </div>
</template>