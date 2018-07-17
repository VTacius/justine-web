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
                    o: 4, 
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
                {label: 'Lugar 1', value: 1},
                {label: 'Establecimiento externo 1', value: 2},
                {label: 'Establecimiento interno 1', value: 3},
                {label: 'Oficina', value: 4}
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

