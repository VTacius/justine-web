<script>

import vtUsuarioDetalle from './../usuarios/detalle.vue';

export default {
    name: 'vtPrincipalPerfil',
    components: { vtUsuarioDetalle },
    data: function(){
        return {
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
                buzonStatus: true
            },
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
}
</script>
<template>
	<div class="pure-u-1">
        <vt-usuario-detalle :usuario="usuario" :extendido="true"></vt-usuario-detalle>
	</div>
</template>