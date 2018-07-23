<script>
import vtValidacion from './validacion.vue';

export default {
    name: 'vt-seleccionador',
    components: { vtValidacion },
    props: ['uid', 'etiqueta', 'modelo', 'datos', 'filtro', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo
        }
    },
    computed: {
        listado: function(){
            let resultado = this.datos.filter(function(elemento){
                return (this.filtro.indexOf(elemento.value)>= 0);
            }, this);
            return resultado;
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
        <select class="pure-u-1" :id="uid" :name="uid" v-model="valor" >
            <option v-for="option in listado" :key="option.value" :value="option.value">
                {{option.label}}
            </option>
        </select>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" @vt-validar="validar">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
</template>

