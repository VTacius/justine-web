<script>
import vistaBase from './../../mixins/vistaBase.js';
import vtUsuarioFormulario from './formulario.vue';
import { nuevo } from "./configuracion.js";
import { vhttp } from './../../utils/peticion.js';

export default {
    name: 'vtCreacionUsuarios',
    mixins: [ vistaBase ],
    components: { vtUsuarioFormulario },
    data: function(){
        return {
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
            grupos : []
        }
    },
    created: function () {
        this.peticion('/grupos', this, 'grupos', 'lista');
        this.peticion('/establecimientos', this, 'establecimientos', 'lista', true);
    },
    methods: {
        obtenerOficina: function(establecimiento){
            this.peticion('/oficinas/' + establecimiento, this, 'oficinas', 'lista');
        },
        enviaDatos: function(datos){
            console.log('Estoy a punto de contactar a la API');
            console.log(datos);
            vhttp.post('/usuarios/', datos)
                .then(function(respuesta){
                    console.log(respuesta);
                })
                .catch(function(error){
                    console.log(error);
                });
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
