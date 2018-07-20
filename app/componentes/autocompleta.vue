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
                v.texto = contenido.label;
                v.valor = contenido.value;
            }
        });

        /* Configuramos el valor por primera vez  */
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
        validar: function(valor){
            this.invalido = valor;
            this.$emit('vt-cambio', this.uid, this.valor, this.invalido);
        },
        cambios: function(evento){
            this.valor = evento.target.value;
        }
    }   
}   
</script>
<template>
    <!-- TODO: Revisar esta maqueta, es bastante mejorable. Todas las maquetas de tipo control -->
    <div class="pure-g jt-form-component">
        <div class="pure-u-1">
            <label :for="uid">{{etiqueta}}: {{valor}}</label>
        </div>
        <div class="pure-u-1">
            <input type="text" class="pure-u-1" :id="uid" :value="texto" @change="cambios">
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" @vt-validar="validar" :datos="this.datos">
            <template slot="requerido"><slot name="requerido"></slot></template>
            <template slot="existente"><slot name="existente"></slot></template>
        </vt-validacion>
    </div>
</template>