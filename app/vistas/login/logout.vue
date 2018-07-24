<script>
/** La actual librería para manejar la autenticación */
import Autenticacion from './../../autenticacion/main.js';
const auth = new Autenticacion();

export default {
    name: 'vtViewLogout',
    mounted: function(){
        auth.logout();
        this.$router.push('/');
    }
}
</script>
<template>
</template>
