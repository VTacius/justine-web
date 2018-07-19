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
                    o: '2', 
                    userPassword: 'Pass_2025',
                    nit: '4444-666666-333-1',
                    dui: '12345678-0',
                    jvs: '',
                    anio: '16/11/1990',
                    pregunta: '¿Quién soy?',
                    respuesta: 'Soi io',
                    mail: 'kpenate@salud.gob.sv',
                    grupos: [1001, 1003]
                },
            establecimientos : [
                {label: 'Lugar 1', value: 1},
                {label: 'Establecimiento externo 1', value: 2},
                {label: 'Establecimiento interno 1', value: 3},
                {label: 'Oficina', value: 4}
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
    <div>
        <vt-usuario-edicion v-bind:usuario="usuario" v-bind:establecimientos="establecimientos" v-bind:grupos="grupos"></vt-usuario-edicion>
    </div>
</template>

