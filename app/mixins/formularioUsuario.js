import { vhttp } from './../utils/peticion.js';

const formularioUsuario = {
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
                    console.log(error);
                }).then(function(){
                    if (emision){
                        ambito['cargado'] = true;
                    }
                }); 
        },
        reseteaFormulario: function(){
            console.log('Reseteo formulario');
            let vm = this;
            let tmp = {};
            let claves = Object.keys(this.usuario);
            
            claves.map(function(clave){
                tmp[clave] = vm.usuario[clave];
            });
            
            claves.map(function(clave){
                vm.usuario[clave] = "  ";
            });

            this.$nextTick().then(function(){
                vm.usuario = tmp;
            });
        },
        obtenerOficina: function(establecimiento){
            this.peticion('/oficinas/' + establecimiento, this, 'oficinas', 'lista');
        },
    }
};

export default formularioUsuario;