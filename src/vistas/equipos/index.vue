<template>
    <div class="contenedor">
        <vt-buscador v-model="filtro"></vt-buscador>
        <vt-panel v-for="equipo in listaItems" :key="equipo.full_name" :botones="confBotones">
            <vt-informacion-equipos :equipo="equipo"></vt-informacion-equipos>
        </vt-panel>
    </div>
</template>

<script>
import vtIndex from "@/componentes/bases/vtIndex";
import VtPanel from "@/componentes/VtPanel";
import VtBuscador from '@/componentes/VtBuscador';
import VtInformacionEquipos from "@/componentes/equipos/VtInformacion";
export default {
    name: 'gruposIndex', 
    extends: vtIndex,
    components: {VtPanel, VtBuscador, VtInformacionEquipos},
    data: function(){
        return {
            confBotones: {
                detalle: true, 
                edicion: false,
                borrado: false
            },
            endpoint: {
                base: '/repositories',
                busqueda: '/search/repositories'
            },
            attrId: 'full_name',
            attrFiltros: ['full_name', 'html_url'],
            limite: 3000,
        }
    }
}
</script>

<style lang="scss" scoped>
</style>