<template>
    
</template>
<script>

export default {
    name: 'logout',
    mounted: function(){
        this.$emit('logout', true); 
        this.$router.push('/');
    }
}
</script>