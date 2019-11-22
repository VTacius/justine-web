<template>
    <div class="pure-g">
        <div class="pure-u-1">
            <h2>Esta es la vista de Usuarios</h2>
            <h3>{{contenido}}</h3>
            <vt-entrada uid="principal" v-model="contenido"></vt-entrada>
            </div>
    </div>
</template>

<script>
import VtEntrada from "@/componentes/formularios/VtEntrada";
export default {
    name: 'usuario',
    components: { VtEntrada },
    data: function(){
        return {
            contenido: "Nada especial"
        }
    }
}
</script>

<style>

</style>