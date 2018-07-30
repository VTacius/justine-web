<script>
import vtValidacion from './validacion.vue';

export default {
    name: 'vt-entrada',
    components: { vtValidacion },
    props: ['uid', 'etiqueta', 'modelo', 'validaciones'],
    data: function(){
        return {
            valor: this.modelo,
            guarnecido: this.modelo,
            valido: true
        }
    },
    watch:{
        modelo: function(valor){
            this.valor = valor;
        }
    },
    methods: {
        /** 
         * El gran cambio, ¿Podrían ambos métodos ser iguales con los de fecha y autocompleta? 
         * Sí: El cambio ha sido necesario para que funcione con el formulario. Es decir, al forzar 
         * la reactividad, nuestro resultado viene dado precisamente por el procesode validacion
         * TODO: Eliminar esta respuesta
        */
        validar: function(validacion){
            this.valido = validacion;
            this.$emit('vt-cambio', this.uid, this.valor, this.valido);
        },
        cambios: function(evento){
            this.valor = evento.target.value;
        }
        
    }

    
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <div class="pure-u-1">
            <label :for="uid">{{etiqueta}} <span v-if="!valido">Es inválido</span></label>
        </div>
        <div class="pure-u-1">
            <input type="text" :id="uid" :name="uid" :placeholder="etiqueta" v-model="valor" @change="cambios($event)" autocomplete="off">
        </div>
        <vt-validacion :uid="uid" :validaciones="validaciones" :valor="valor" :valor-viejo="guarnecido" @vt-validar="validar">
            <template v-for="v in validaciones" :slot="v"><slot :name="v"></slot></template>
        </vt-validacion>
    </div>
    
</template>