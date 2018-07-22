<script>
import vtUsuarioEdicion from './usuarios/edicion.vue';

export default {
    name: 'vt-principal',
    components: {vtUsuarioEdicion},
    data: function(){
        return {
            usuario: {
                    uid: 'kpenate',
                    givenName: 'Karen',
                    sn: 'Peñate',
                    ou: 'Oficina',
                    o: 2, 
                    userPassword: 'Pass_2025',
                    nit: '4444-666666-333-1',
                    dui: '12345678-0',
                    jvs: '',
                    fecha: '16/11/1990',
                    pregunta: '¿Quién soy?',
                    respuesta: 'Soi io',
                    mail: 'kpenate@salud.gob.sv',
                    grupos: [1001, 1003],
                    grupo: [1001]
                },
            establecimientos : [
                {label: 'Lugar 1', value: 1},
                {label: 'Establecimiento externo 2', value: 2},
                {label: 'Establecimiento interno 3', value: 3},
                {label: 'Oficina 4', value: 4}
            ],
            grupos : [
                {label: 'Administradores', value: 1001},
                {label: 'Navegacion Web', value: 1002},
                {label: 'Navegacion limitada', value: 1003},
                {label: 'Usuarios', value: 1004}
            ]
        }
    }
}
</script>
<template>
        <vt-usuario-edicion configuracion="edicion" :usuario="usuario" :establecimientos="establecimientos" :grupos="grupos"></vt-usuario-edicion>
</template>

