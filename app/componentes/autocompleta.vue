<script>
import Awesomecomplete from "awesomplete";

export default {
    name: 'vt-autocompleta',
    components: { Awesomecomplete },
    props: ['uid', 'etiqueta', 'modelo', 'datos'],
    data: function(){
        return {
            valor: this.modelo,
            texto: ""
        }
    },
    mounted: function(){
        let elemento = document.getElementById('completador');
        let v = this;
        new Awesomecomplete(elemento, {
            list: this.datos,
            replace: function(contenido){
                this.input.value = contenido.label;
                v.valor.valor = contenido.value;
            }
        });
        let resultado = this.buscarId(this.datos, this.valor.valor)
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
                this.valor.valor = resultado.value;
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
    <!-- TODO: Partiendo de la necesaria base de como es que tenemos disponibles los datos, aún hay mucho que trabajar por acá 
        * ¿Es necesario que los datos sean en forma de diccionario?
        * La idea por ahora es que del backend nos envíen nada más que el id, yo lo busco después en la lista de establecimientos
        * Al parecer no hay forma de seleccionar uno en base a un atributo. Es posible configurar valor. Parece que toca implementar algo sencillo para nuestro caso
    -->
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <!-- <input class="pure-u-1" v-bind:id="uid" v-bind:name="uid" type="text" placeholder="Nombre" v-model="valor.valor" v-on:change="$emit('vt-cambio', $event, modelo)"> -->
        <input id="completador" v-bind:value="texto" v-on:change="cambios">
        <div> <!-- Acá un ng-show si el formulario ha sido enviado o el elemento ya usado -->
            <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-if="valor.error.requerido"> 
                <i class="fa fa-exclamation-triangle"></i><slot name="requerido">Campo requerido</slot>
            </label> 
            <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-if="valor.error.sustantivo">
                <i class="fa fa-exclamation-triangle"></i><slot name="sustantivo">Revise el campo ingresado</slot>
            </label> 
            <label class="pure-u-1 jt-label-error" v-bind:for="uid" v-if="valor.error.existente">
                <i class="fa fa-exclamation-triangle"></i><slot name="existente">El campo no puede reemplazarse por un valor vacío</slot>
            </label> 
        </div>
    </div>
</template>