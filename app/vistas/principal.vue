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
                    o: {
                        nombre: 'Lugar'
                    },
                    userPassword: 'Pass_2025',
                    nit: '000-000',
                    dui: '000-000',
                    jvs: '',
                    anio: '',
                    pregunta: '¿Quién soy?',
                    respuesta: 'Soi io',
                    mail: 'kpenate@salud.gob.sv',

                },
            establecimientos : [
                {label: 'Lugar 1', value: '1'},
                {label: 'Lugar 2', value: '2'},
                {label: 'Lugar 3', value: '3'},
                {label: 'Lugar 4', value: '4'}
            ]
        }
    }
}
</script>
<template>
    <div>
        <vt-usuario-edicion v-bind:usuario="usuario" v-bind:establecimientos="establecimientos"></vt-usuario-edicion>
    </div>
</template>

