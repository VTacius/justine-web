<script>
import vtUsuarioFormulario from './formulario.vue';
import { nuevo } from "./configuracion.js";

export default {
    name: 'vt-principal',
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
            establecimientos : [
                {label: 'Lugar 1', value: 1},
                {label: 'Establecimiento externo 2', value: 2},
                {label: 'Establecimiento interno 3', value: 3},
                {label: 'Lugar 4', value: 4}
            ],
            oficinas: [],
            oficinasDatos: {
                1: [
                    {label: 'Administración', value: 1001},
                    {label: 'Contaduría', value: 1002}
                ],
                2: [
                    {label: 'Administración', value: 2001},
                    {label: 'RRHH', value: 2002}
                ]
            },
            grupos : [
                {label: 'Administradores', value: 1001},
                {label: 'Navegación Web', value: 1002},
                {label: 'Navegación limitada', value: 1003},
                {label: 'Técnicos', value: 1004},
                {label: 'Usuarios', value: 1005}
            ]
        }
    },
    methods: {
        obtenerOficina: function(establecimiento){
            /** TODO: Esta es la idea. La fuente será una petición http seguramente */
            if(establecimiento in this.oficinasDatos){
                this.oficinas = this.oficinasDatos[establecimiento];
            } else {
                this.oficinas = [];
            }
        }
    }
}
</script>
<template>
	<div class="pure-u-1">
       <vt-usuario-formulario 
           :configuracion="configuracion"
           :datos="usuario" 
           :establecimientos="establecimientos" 
           :oficinas="oficinas"
           :grupos="grupos" 
           @vt-cambio-establecimiento="obtenerOficina"></vt-usuario-formulario>
	</div>
</template>

