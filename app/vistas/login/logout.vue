<script>
import { vhttp } from './../../utils/peticion.js';

export default {
    name: 'vtViewLogout',
    mounted: function(){
        let vm = this;
        vhttp.post('/auth/logout')
            .then(function(respuesta){
                vm.$cookie.delete('logueado');
            })
            .catch(function(error){
                console.log(error);
            });
        this.$router.push('/');
    }
}
</script>
<template>
</template>
