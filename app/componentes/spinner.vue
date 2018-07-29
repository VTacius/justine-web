<script>
export default {
    name: 'vt-spinner',
    props: ['activar'],
    data: function(){
        return {
            mostrar: this.activar
        }
    },
    watch: {
        activar: function(valor){
            this.mostrar = valor;
        }
    }
}
</script>
<template>
<div v-show="mostrar">
    <div class="blackout"></div>
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
</div>
</template>

