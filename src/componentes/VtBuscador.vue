<template>
	<form @submit.prevent="envio" novalidate>
	    <i class="fa fa-search"></i>
	    <input type="text" :value="valor" @input="cambio">
	</form>
</template>

<script>
export default {
    name: 'VtBuscador',
    props: {
        value: String,
        default: ''
    },
    data: function(){
        return {
            valor: this.value
        }
    },
    methods: {
        envio: function(e){
            this.$emit('input', e.target.value);
        },
        cambio: function(e){
            this.$emit('input', e.target.value);
        }
        
    }

}
</script>

<style lang="scss" scoped>
$color-fondo: #f2f2f2;
$color-texto: #565d64;
$color-fondo-input: #c9c9c9;
$color-fondo-input-activo: #969696;
$posicion: 1.25rem;

form {
    text-align: center;
    margin-bottom: 0.6rem;
}

i {
    text-align: center;
    position: relative;
    top: 50%;
    left: 0.3rem;
    z-index: 2;
}

input {
    box-sizing: border-box;
    width: 95%;
    color: $color-texto;
    line-height: normal;
    left: -$posicion;
    position: relative;
    z-index: 1;
    border: none;
    background-color: $color-fondo;
    padding: 0.5rem 0.5rem 0.5rem $posicion + 0.5rem ;
    border-bottom: solid 0.24rem $color-fondo-input;
    border-bottom-left-radius: 0.15rem;
    border-bottom-right-radius: 0.15rem;
}

input:focus {
    outline: none;
    border-bottom: solid 0.2rem $color-fondo-input-activo;
}
</style>