<script>
import vistaBase from './../mixins/vistaBase.js';
import vtUsuarioFormulario from './usuarios/formulario.vue';
import { edicion } from "./usuarios/configuracion.js";

export default {
    name: 'vt-principal',
    mixins: [ vistaBase ],
    components: { vtUsuarioFormulario },
    data: function(){
        return {
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
    },
    methods: {
        obtenerOficina: function(establecimiento){
            this.peticion('/oficinas/' + establecimiento, this, 'oficinas', 'lista');
        },
        enviaDatos: function(datos){
            console.log(datos);
        },
        reseteaFormulario: function(){
            this.cargado = false;
            this.$nextTick(function(){
                this.cargado = true;
            });
        },
    }
}
</script>
<template>
	<div class="pure-u-1">
        <vt-usuario-formulario 
            :modelo="usuario" v-if="cargado"
            :configuracion="configuracion"
            :establecimientos="establecimientos" 
            :oficinas="oficinas"
            :grupos="grupos" 
            @vt-cambio-establecimiento="obtenerOficina"
            @vt-envio="enviaDatos"
            @vt-reseteo="reseteaFormulario"></vt-usuario-formulario>
	</div>
</template>
