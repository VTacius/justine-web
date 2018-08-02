<script>
import vtUsuarioFormulario from './usuarios/formulario.vue';
import formularioUsuario from './../mixins/formularioUsuario.js';
import { edicion } from "./usuarios/configuracion.js";

export default {
    name: 'vt-principal',
    mixins: [ formularioUsuario ],
    components: { vtUsuarioFormulario },
    data: function(){
        return {
            cargado: false,
            configuracion: edicion,
            usuario: {},
            establecimientos : [],
            oficinas: [],
            grupos : []
        }
    },
    created: function () {
        this.peticion('/usuarios/kpenate', this, 'usuario', 'elemento');
        this.peticion('/grupos', this, 'grupos', 'lista');
        this.peticion('/establecimientos', this, 'establecimientos', 'lista', true);
    }
}
</script>
<template>
	<div class="pure-u-1">
       <vt-usuario-formulario v-if="cargado" 
           :configuracion="configuracion"
           :modelo="usuario" 
           :establecimientos="establecimientos" 
           :oficinas="oficinas"
           :grupos="grupos" 
           @vt-cambio-establecimiento="obtenerOficina"
           @vt-reseteo="reseteaFormulario"></vt-usuario-formulario>
	</div>
</template>
