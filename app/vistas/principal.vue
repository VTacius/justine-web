<script>
import vtUsuarioFormulario from './usuarios/formulario.vue';
import { edicion } from "./usuarios/configuracion.js";
import {vhttp} from './../utils/peticion.js';

export default {
    name: 'vt-principal',
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
        
    },
    watch: {
        cargado: function(valor){
            /** Al parecer, este nos permitirá llamar el spinner en otros procesos */
            this.$emit('vt-cargado', !valor)
        }
    },
    methods: {
        peticion: function(recurso, ambito, recibidor, cantidad, emision){
            vhttp.get(recurso)
                .then(function(respuesta){
                    console.log('Este ha sido el resultado de la peticion para ' + recibidor);
                    ambito[recibidor] = (cantidad === 'elemento') ? respuesta.data[0] : respuesta.data;
                }).catch(function(error){
                    console.log('Hubo un error en la petición (¿O es en la aplicacion?)');
                    console.log(error);
                }).then(function(){
                    console.log('Siempre ejecutado');
                    if (emision){
                        ambito['cargado'] = true;
                    }
                })

        },
        obtenerOficina: function(establecimiento){
            this.peticion('/oficinas/' + establecimiento, this, 'oficinas', 'lista');
        }
    }
}
</script>
<template>
	<div class="pure-u-1">
       <vt-usuario-formulario v-if="cargado" 
           :configuracion="configuracion"
           :datos="usuario" 
           :establecimientos="establecimientos" 
           :oficinas="oficinas"
           :grupos="grupos" 
           @vt-cambio-establecimiento="obtenerOficina"></vt-usuario-formulario>
	</div>
</template>

