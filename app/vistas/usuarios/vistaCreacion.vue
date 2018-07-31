<script>
import vtUsuarioFormulario from './formulario.vue';
import formularioUsuario from './../../mixins/formularioUsuario.js';
import { nuevo } from "./configuracion.js";

export default {
    name: 'vtCreacionUsuarios',
    mixins: [ formularioUsuario ],
    components: { vtUsuarioFormulario },
    data: function(){
        return {
            cargado: false,
            configuracion: nuevo,
            usuario: {
                uid: '',
                givenName: '',
                sn: '',
                ou: '',
                o: '', 
                userPassword: '',
                nit: '',
                dui: '',
                jvs: '',
                fecha: '',
                pregunta: '',
                respuesta: '',
                mail: '',
                grupos: [],
                grupo: '',
                title: '',
                sambaAcctFlags: true,
                telephoneNumber: '',
                loginShell: '/bin/false',
                cuentaStatus: true,
                buzonStatus: true,
                buzonVolumen: ''
            },
            establecimientos : [],
            oficinas: [],
            oficinasDatos: [],
            grupos : []
        }
    },
    created: function () {
        this.peticion('/grupos', this, 'grupos', 'lista');
        this.peticion('/establecimientos', this, 'establecimientos', 'lista', true);
    }
}
</script>
<template>
	<div class="pure-u-1">
       <vt-usuario-formulario 
           :configuracion="configuracion" v-if="cargado"
           :datos="usuario" 
           :establecimientos="establecimientos" 
           :oficinas="oficinas"
           :grupos="grupos" 
           @vt-cambio-establecimiento="obtenerOficina"
           @vt-reseteo="reseteaFormulario"></vt-usuario-formulario>
	</div>
</template>
