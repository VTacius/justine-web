<template>
    <div class="componente">
        <div class="elemento">
            <label :for="uid">{{etiqueta}} <span v-if="!valido">Es inválido</span></label>
        </div>
        <div class="elemento">
            <multiselect 
                selectLabel="Oprima Enter para seleccionar"
                deselectLabel="Oprima Enter para deseleccionar"
                placeholder="Seleccione una opción"
                :id="uid"
                :value="value" 
                @input="actualizarCambios"
                :options="opciones" 
                track-by="value" 
                label="label" 
                :multiple="multiple"
                :allow-empty="!requerido"
                :hide-selected="requerido" 
                :preselect-first="requerido">
                <template slot="noOptions">No hay elementos que mostrar</template>
                <template slot="noResult">La búsqueda no arrojó resultados</template>
            </multiselect>
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect';

export default {
    name: 'VtAutocompleta',
    components: { Multiselect },
    props: {
        'uid': String, 
        'etiqueta': String, 
        'value': [Object, Array], 
        'validaciones': {
            type: Array,
            default: function(){
                return [];
            }
        }, 
        'opciones': {
            type: Array,
            default: function(){
                return [];
            },
        },
        'multiple': Boolean
    },
    data: function(){
        return {
            guarnecido: this.value,
            valido: true
        };
    },
    methods: {
        actualizarCambios : function(valor){
            console.log(`Se supone que he cambiado en ${this.uid} con ${valor}. Guarnecido esta así ${this.guarnecido}`);
            console.log(this.guarnecido);
            console.log(valor);
            this.$emit('input', valor);
        }
    }, 
    computed: {
        requerido: function(){
            let requerido = (this.validaciones.indexOf('requerido') >= 0);
            let existente = (this.validaciones.indexOf('existente') >= 0);
            return existente || requerido;
        }
    },
    watch: {
        opciones: function(valor){
            /* Si ya había escogido un valor de la lista */
            if ('value' in this.value){
                let value = this.value.value;
                /* Busco si dicha selección esta en los valores actuales */
                let seleccionado = valor.find(function(elemento){
                    return elemento.value === value;
                });
                /* En caso de no estarlo, cambio el valor del modelo */
                if (typeof(seleccionado) === 'undefined'){
                    this.$emit('input', {});
                }
            }
        }
    }
};   
</script>
<style lang="scss">
    @import "@/sass/variables.scss";
    @import "@/sass/multiselect.scss";
    
    .multiselect__tags {
        border: none;
        outline: none;
        box-shadow: none;
        border-bottom: solid 0.2rem $color-borde-input;
        border-bottom-left-radius: 0.15rem;
        border-bottom-right-radius: 0.15rem;
    }
</style>