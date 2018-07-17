<script>
import Awesomecomplete from "awesomplete";

export default {
    name: 'vt-autocompleta',
    props: ['datos'],
    components: { Awesomecomplete },
    data: function () {
        return {
            modelo: {label: 'Lugar 1', value: '1'},
        }
    },
    mounted: function(){
       let elemento = document.getElementById('completador');
       new Awesomecomplete(elemento, {
           list: this.datos,
           replace: function(contenido){
               console.log(contenido);
               this.input.value = contenido.label;
           }
       });
    }
}
</script>
<template>
    <!-- TODO: Partiendo de la necesaria base de como es que tenemos disponibles los datos, aún hay mucho que trabajar por acá 
        * ¿Es necesario que los datos sean en forma de diccionario?
        * La idea por ahora es que del backen nos envíen nada más que el id, yo lo busco después en la lista de establecimientos
        * Falta toda la maqueta, que incluya errores y toda la cosa
        * Al parecer no hay forma de seleccionar uno en base a un atributo. Es posible configurar valor. Parece que toca implementar algo sencillo para nuestro caso
    -->
    <input id="completador" v-model="modelo.label">
</template>