<template>
    <div class="contenedor">
        <vt-buscador v-model="filtro"></vt-buscador>
        <vt-panel v-for="grupo in listaItems" :key="grupo.login" :abiertoGlobal="hayUnoAbierto" @abierto="configurarAbierto" :botones="confBotones" :esAdmin="admin">
            <vt-informacion-grupos :grupo="grupo"></vt-informacion-grupos>
            <vt-detalle-grupo slot="detalle"></vt-detalle-grupo>
            <vt-edicion-grupo slot="edicion"></vt-edicion-grupo>
            <vt-borrado-grupo slot="borrado"></vt-borrado-grupo>
        </vt-panel>
    </div>
</template>

<script>
import vtIndex from "@/componentes/bases/vtIndex";
import VtPanel from "@/componentes/VtPanel";
import VtBuscador from '@/componentes/VtBuscador';
import VtInformacionGrupos from "@/componentes/grupos/VtInformacion";
import VtDetalleGrupo from "@/componentes/grupos/detalle";
import VtEdicionGrupo from "@/componentes/grupos/edicion";
import VtBorradoGrupo from "@/componentes/grupos/borrado";
export default {
    name: 'gruposIndex', 
    extends: vtIndex,
    components: {VtPanel, VtBuscador, VtInformacionGrupos, VtDetalleGrupo, VtEdicionGrupo, VtBorradoGrupo},
    data: function(){
        return {
            confBotones: {
                detalle: true, 
                edicion: true,
                borrado: false
            },
            endpoint: {
                base: '/organizations',
                busqueda: '/search//organizations'
            },
            attrId: 'login',
            attrFiltros: ['login', 'url'],
            nadie: 3000,
            hayUnoAbierto: false,
            admin: true,
        }
    },
    methods: {
        configurarAbierto: function(estado){
            this.hayUnoAbierto = estado;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>