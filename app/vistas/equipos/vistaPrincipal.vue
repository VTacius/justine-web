<script>
import vistaBase from './../../mixins/vistaBase.js';
import vtFormularioEquipos from './formulario.vue';
import { nuevo } from './configuracion.js';

export default {
    name: 'vtPrincipalEquipos',
    mixins: [vistaBase],
    components: { vtFormularioEquipos },
    data: function(){
        return {
            configuracion: nuevo,
            equipo: {
                hostname: 'c0128-4567',
                descripcion: ''
            }
        }
    },
    mounted: function(){
        this.cargado = true;
    }
}
</script>
<template>
    <div class="pure-u-1">
        <vt-formulario-equipos :modelo="equipo" :configuracion="configuracion"></vt-formulario-equipos>
    </div>
</template>

