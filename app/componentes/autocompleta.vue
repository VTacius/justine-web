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
        /** Recuerda que el replace es necesario para que muestre label en lugar de valor */
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
                /** TODO: Revisa que cuando se oprime enter funcione. - No funciona con tabSelect  */
                this.valor = resultado.value;
                this.texto = resultado.label;
            } else {
                /** Así mostramos el mensaje */
                /** De esta forma, hacemos la validación acá, enviamos a validaciones datos que desencadenen los eventos necesarios
                 * para mostrar errores y todo eso
                 */
                this.texto = '';
                this.valor = '';
            }
        }
    }   
}   
</script>
<template>
    <!-- TODO: Revisar esta maqueta, es bastante mejorable. Todas las maquetas de tipo control -->
    <div class="pure-g jt-form-component">
        <div class="pure-u-1">
            <label v-bind:for="uid">{{etiqueta}}: {{valor}}</label>
        </div>
        <div class="pure-u-1">
            <input type="text" class="pure-u-1" v-bind:id="uid" v-bind:value="texto" v-on:change="cambios">
        </div>
        <vt-validacion v-bind:uid="uid" v-bind:validaciones="validaciones" v-bind:valor="valor">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
        </vt-validacion>
    </div>
</template>