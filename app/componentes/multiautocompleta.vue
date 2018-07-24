<script>
import vtValidacion from './validacion.vue';
import Multiselect from 'vue-multiselect';

export default {
    name: 'vt-multiautocompleta',
    components: { vtValidacion, Multiselect },
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo
        }
    },
    computed: {
        opciones: {
            get: function(){
                let resultado = this.datos.filter(function(elemento){
                    return this.valor.indexOf(elemento.value) >=0;
                },this);
                return resultado;
            },
            set: function(newValor){
                let resultado = newValor.map(function(elemento){
                    return elemento.value;
                }, this);
                this.valor = resultado;
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
            <multiselect v-model="opciones" :options="datos" track-by="value" label="label" :multiple="true" :hide-selected="true" :preselect-first="false">
                    <template slot="singleLabel" slot-scope="props">
                        <span class="option__desc">
                            <span class="option__title">{{ props.option.label }}</span>
                        </span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <div class="option__desc">
                            <span class="option__title">{{ props.option.label }}</span>
                        </div>
                    </template>
            </multiselect>
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" @vt-validar="validar">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
</template>