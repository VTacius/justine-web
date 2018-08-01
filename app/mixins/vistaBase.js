import { vhttp } from './../utils/peticion.js';

const formularioUsuario = {
    data: function(){
        return {
            cargado: false
        };
    },
    watch: {
        cargado: function(valor){
            /** Al parecer, este nos permitirá llamar el spinner en otros procesos */
            this.$emit('vt-cargado', !valor);
        }
    },
    methods: {
        peticion: function(recurso, ambito, recibidor, cantidad, emision){
            vhttp.get(recurso)
                .then(function(respuesta){
                    /* console.log('Este ha sido el resultado de la peticion para ' + recibidor); */
                    ambito[recibidor] = (cantidad === 'elemento') ? respuesta.data[0] : respuesta.data;
                }).catch(function(error){
                    /* console.log('Hubo un error en la petición (¿O es en la aplicacion?)');*/
                }).then(function(){
                    if (emision){
                        ambito['cargado'] = true;
                    }
                }); 
        },
    }
};

export default formularioUsuario;