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
            autocomplete: Object,
            texto: ""
        }
    },
    watch: {
        datos: function(){
            this.autocomplete.list = this.datos
        }
    },
    mounted: function(){
        let elemento = document.getElementById(this.uid);
        let v = this;
        /** Recuerda que el replace es necesario para que muestre label en lugar de valor */
        this.autocomplete = new Awesomecomplete(elemento, {
            list: this.datos,
            replace: function(contenido){
                this.input.value = contenido.label;
                v.texto = contenido.label;
                v.valor = contenido.value;
            }
        });

        /** Configuramos el valor por primera vez  */
        /** TODO: Por ahora presenta el inconveniente de valida dos veces, después todo bien  */
        this.texto = this.valor;
    },
    methods: {
        validar: function(validez, resultado){
            this.invalido = validez;
            if (typeof(resultado) === "undefined"){
                this.valor = this.valor
            } else {
                this.valor = resultado.value;
                this.texto = resultado.label;
            }
            this.$emit('vt-cambio', this.uid, this.valor, this.invalido);
        },
        cambios: function(evento){
            this.texto = evento.target.value;
            /** 
             * Como no sabemos si el valor será válido, lo borramos a la espera que la 
             * validación nos lo diga
             */
            this.valor = " ";
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
            <input class="pure-u-1" type="text" :id="uid" :value="texto" @change="cambios($event)">
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="texto" @vt-validar="validar" :datos="this.datos">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
</template>