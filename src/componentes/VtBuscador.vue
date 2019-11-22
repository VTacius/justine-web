<template>
    <div class="search">
      <span class="fa fa-search"></span>
      <input type="text" :value="valor" @input="cambio">
    </div>
</template>

<script>
export default {
    name: 'VtBuscador',
    props: {
        value: String
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
$color-fondo: #d9dbdd;
$color-texto: #565d64;
$color-fondo-input: #c9c9c9;
$color-fondo-input-activo: #969696;
$color-borde-input: #cbcbcb;
$color-borde-input-activo: #969696;
$posicion: 1.25rem;

.search {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    color: $color-texto;
    box-sizing: border-box;
    padding: 0.2rem;
    margin-bottom: 0.45rem;
}

.search input {
    width: 100%;
    height: 32px;
    z-index: 1;
    background: $color-fondo;
    border: 1px solid #aaa;
    border-radius: 5px;
    border: none;
    border-bottom: solid 0.3rem $color-borde-input;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    transition: 0.3s;
}

.search input:focus {
    border-bottom-color: $color-borde-input-activo;
}

.search input { 
    text-indent: 32px;
}

.search .fa-search { 
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>