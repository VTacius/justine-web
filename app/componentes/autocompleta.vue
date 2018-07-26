<script>
import vtValidacion from './validacion.vue';
import Multiselect from 'vue-multiselect';

export default {
    name: 'vt-autocompleta',
    components: { vtValidacion, Multiselect },
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'validaciones', 'multiple', 'filtro'],
    data: function(){
        return {
            valor: this.modelo
        }
    },
    computed: {
        seleccionados: {
            get: function(){
                let valor = Array.isArray(this.valor) ? this.valor : [this.valor];
                let resultado = this.datos.filter(function(elemento){
                    return valor.indexOf(elemento.value) >=0;
                },this);
                return resultado;
            },
            set: function(newValor){
                /** TODO: Algo más sencillo que esto, por favor */
                let valor = Array.isArray(newValor) ? newValor : [newValor];
                let resultado = valor.map(function(elemento){
                    return elemento.value;
                }, this);
                this.valor = resultado;
            }
        },
        opciones: function(){
            if(this.filtro){
                let resultado = this.datos.filter(function(elemento){
                    return this.filtro.indexOf(elemento.value) >= 0;
                }, this);
                return resultado;
            } else {
                return this.datos;
            }
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
        <div class="pure-u-1">
            <label class="pure-u-1" :for="uid">{{this.etiqueta}}</label>
        </div>
        <div class="pure-u-1">
            <!-- TODO: El mismo creador dice que no deberías usar v-model -->
            <!-- TODO: cuando :multiple="false", es probable que quieras usar :hide-selected="false" y revisar :preselect-first-->
            <multiselect 
                :id="uid"
                v-model="seleccionados" 
                selectLabel="Oprima Enter para seleccionar"
                placeholder="Seleccione una opción"
                :options="opciones" 
                track-by="value" 
                label="label" 
                :multiple="multiple" 
                :hide-selected="true" 
                :preselect-first="false"></multiselect>
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" @vt-validar="validar" :datos="opciones">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
</template>