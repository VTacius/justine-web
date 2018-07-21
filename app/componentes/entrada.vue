<script>
import vtValidacion from './validacion.vue';

export default {
    name: 'vt-entrada',
    components: { vtValidacion },
    props: ['uid', 'etiqueta', 'modelo', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo,
            invalido: false
        }
    },
    methods: {
        validar: function(valor){
            this.invalido = valor;
        },
        cambios: function(evento, valor, invalido){
           this.$emit('vt-cambio', this.uid, valor, invalido);
        }
        
    }

    
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" :for="uid">{{etiqueta}} <span v-if="invalido">Es inválido</span></label>
        <input type="text" class="pure-u-1" :id="uid" :name="uid" placeholder="Nombre" v-model="valor" @change="cambios($event, valor, invalido)">
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" @vt-validar="validar">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="sustantivo"><slot name="sustantivo"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
            <template slot="dui"><slot name="dui"></slot></template>
            <template slot="nit"><slot name="nit"></slot></template>
        </vt-validacion>
    </div>
    
</template>