<script>
import vtValidacion from './validacion.vue';
import Multiselect from 'vue-multiselect';

export default {
    name: 'vt-autocompleta',
    components: { vtValidacion, Multiselect },
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'validaciones', 'multiple', 'filtro'],
    data: function(){
        return {
            valor: this.modelo,
            guarnecido: this.modelo,
            valido: true
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
                /**
                 * Cuando multiple=true, se devuelve un Array con Objects coincidentes
                 * Cuando multiple=false, se devuelve un Object, el coincidente, así que lo convierto a Array
                 * En este último caso, al dejarle sin nada en el control, nos devuelve una cadena vacía
                 */
                if (newValor) {
                    let valor = Array.isArray(newValor) ? newValor : [newValor];
                    let resultado = valor.map(function(elemento){
                            return elemento ? elemento.value : '';
                    }, this);
                    this.valor = resultado;
                } else {
                    this.valor = [];
                }
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
    watch:{
        modelo: function(valor){
            this.valor = valor;
        }
    },
    methods: {
        validar: function(validacion){
            this.valido = validacion;
            this.$emit('vt-cambio', this.uid, this.valor, validacion);
        }
    }
}   
</script>
<template>
    <div class="pure-g jt-form-component">
        <div class="pure-u-1">
            <label class="pure-u-1" :for="uid">{{this.etiqueta}} <span v-if="!valido">Es inválido</span></label>
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
                :allow-empty="false"
                :multiple="multiple" 
                :hide-selected="true" 
                :preselect-first="false"></multiselect>
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" :valor-viejo="guarnecido" @vt-validar="validar">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
</template>