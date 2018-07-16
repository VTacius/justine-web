
<script>
export default {
    name: 'vt-switch',
    props: ['uid', 'modelo', 'etiqueta'],
    data: function(){
        return {
            valor: this.modelo,
            estadio: false
        }
    },
    computed: {
        activo: function(){
            return ! this.estadio;
        },
        estado: {
            /* El comportamiento es asi:
             * Por defecto, con valor vacío, estará desactivado
             * Si lo activa y no escribe nada, puede desactivar
             * Si lo activa y escribe algo, debe borrar ese algo para desactivar
             */
            get: function(){
                if (this.valor.valor !== "" && this.estadio === false){
                    this.estadio = true;
                    return true;
                }else{
                    return this.estadio;
                };
            },
            set: function(v){
                this.estadio = v;
            }
        }
    },
    methods: {
        envio: function(evento){
            if (!this.activo){
                this.$emit('vt-cambio', evento, this.modelo);
            }
        }
    },
    
}
</script>
<template>
    <div class="pure-g jt-form-component">
        <label class="pure-u-1" v-bind:for="uid">{{etiqueta}}</label>
        <div class="pure-u-1 pure-u-lg-6-24">
            <label class="vt-switch">
                <input type="checkbox" v-model="estado">
                <div class="slider"></div>
                <span class="vt-switch-text">
                    <span class="on"><i class="fa fa-check"></i></span>
                    <span class="off"><i class="fa fa-ban"></i></span>
                </span>
            </label> 
        </div>
        <div class="pure-u-1 pure-u-lg-18-24">
            <input class="pure-u-1" v-bind:id="uid" v-bind:name="uid" type="text" placeholder="JVS" v-bind:disabled="activo" v-model="valor.valor" v-on:change="envio">
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