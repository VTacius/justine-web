<script>
export default {
    name: 'vt-switch',
    props: ['uid', 'modelo'],
    data: function(){
        return {
            valor: this.modelo
        }
    },
    methods: {
        cambios: function(evento, valor){
            /** TODO: Recuerda que el false significa invalido = false */
           this.$emit('vt-cambio', this.uid, valor, false);
        }
    },
    
}
</script>
<template>
    <div class="pure-u-1">
        <label class="vt-switch">
            <input :id="uid" :name="uid" type="checkbox" :checked="valor" @change="cambios($event, valor)">
            <div class="slider"></div>
            <span class="vt-switch-text">
                <span class="on"><i class="fa fa-check"></i></span>
                <span class="off"><i class="fa fa-ban"></i></span>
            </span>
        </label> 
    </div>
    
</template>