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
                    anio: '05/12/1991',
                    pregunta: '¿Quién soy?',
                    respuesta: 'Soi io',
                    mail: 'kpenate@salud.gob.sv',

                }
        }
    }
}
</script>
<template>
    <div>
        <vt-usuario-edicion v-bind:usuario="usuario"></vt-usuario-edicion>
    </div>
</template>

