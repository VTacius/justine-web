<template>
    <div class="pure-g">
        <vt-validacion uid="nombre" :valor="this.valor" :validaciones="['sustantivo']"></vt-validacion>
    </div>
</template>

<script>
import VtValidacion from './componentes/VtValidacion';
export default {
    components :{ VtValidacion },
    data: function (){
        return {
            valor: 'Francisco'
        };
    }
};
</script>

<style>
    @import "../node_modules/font-awesome/css/font-awesome.css";
    
</style>