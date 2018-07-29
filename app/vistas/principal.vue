<script>
import vtUsuarioFormulario from './usuarios/formulario.vue';
import { edicion } from "./usuarios/configuracion.js";

export default {
    name: 'vt-principal',
    components: { vtUsuarioFormulario },
    data: function(){
        return {
            configuracion: edicion,
            usuario: {
                uid: 'kpenate',
                givenName: 'Karen',
                sn: 'Peñate',
                ou: 2002,
                o: 2, 
                userPassword: 'Pass_2025',
                nit: '4444-666666-333-1',
                dui: '12345678-0',
                jvs: '',
                fecha: '16/11/1990',
                pregunta: '¿Quién soy?',
                respuesta: 'Soi io',
                mail: 'kpenate@salud.gob.sv',
                grupos: [1003, 1005],
                grupo: 1003,
                title: 'Profesor designado',
                sambaAcctFlags: true,
                telephoneNumber: '7894',
                loginShell: '/bin/bash',
                cuentaStatus: true,
                buzonStatus: true,
                buzonVolumen: 786432000
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
    mounted: function () {
        /** 
         * Este es nuestro punto para desactivar el spinner 
         * Es obvio que no será tan tortuosos. Lo desactivaré después de obtener los datos
         * */
        
        let vm = this;
        setTimeout(function(){
            console.log('Acabo de cargar');
            vm.$emit('vt-cargado', false);
        }, 2000);
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

