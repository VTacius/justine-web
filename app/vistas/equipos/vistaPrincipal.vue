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
        reseteaFormulario: function(){
            return;
        }
    }
}
</script>
<template>
    <div class="pure-u-1">
        <vt-formulario-equipos 
            :modelo="equipo" v-if="cargado" 
            :configuracion="configuracion"
            :establecimientos="establecimientos" 
            :oficinas="oficinas"
            :grupos="grupos" 
            @vt-cambio-establecimiento="obtenerOficina"
            @vt-reseteo="reseteaFormulario"></vt-formulario-equipos>
    </div>
</template>

