<script>
import vtValidacion from './validacion.vue';
import Awesomecomplete from "awesomplete";

export default {
    name: 'vt-autocompleta',
    components: { vtValidacion, Awesomecomplete },
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo,
            texto: ""
        }
    },
    mounted: function(){
        let elemento = document.getElementById(this.uid);
        let v = this;
        new Awesomecomplete(elemento, {
            list: this.datos,
            replace: function(contenido){
                this.input.value = contenido.label;
                v.valor = contenido.value;
            }
        });
        let resultado = this.buscarId(this.datos, this.valor)
        if (resultado){
            this.texto = resultado.label;
        }
    },
    methods: {
        /** Buscamos sea por label (Nombre del lugar) como por value (ID del lugar) */
        buscarId: function(lista, elemento){
            let value = lista.find(function(item){
                return (item.label == elemento || item.value == elemento); 
            });
            return value;
        },
        cambios: function(valorNuevo){
            let resultado = this.buscarId(this.datos, valorNuevo.target.value)
            if (resultado){
                this.valor = resultado.value;
            } else {
                /** Ha resultado la forma más sencilla de activar la reactividad */
                let texto = this.texto;
                this.texto = " ";
                this.texto = texto;
            }
        }
    }   
}   
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <input class="pure-u-1" v-bind:id="uid" v-bind:value="texto" v-on:change="cambios">
        <vt-validacion v-bind:uid="uid" v-bind:validaciones="validaciones" v-bind:valor="valor">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="sustantivo"><slot name="sustantivo"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
        </vt-validacion>
    </div>
</template>