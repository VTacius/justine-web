<template>
    
</template>
<script>
import Validacion from '@/componentes/formularios/validaciones';
export default {
    name: 'VtFormulario',
    props: {
        'datos': {
            type: Object,
            default: function(){
                return {};
            }
        },
    },
    data: function () {
        return {
            form: {},
            errores: {},
            endpoint: '/'
        }
    },
    mounted: function(){
        /** 
         * Establecemos un valor por defecto vacío para las validaciones. 
         * Esto funciona porque cuando validamos los datos, recolectamos las validaciones directamente del componente
         */
        this.errores = Object.keys(this.datos).reduce(function(objeto, error){
            objeto[error] = [];
            return objeto;
        }, {});

        /** 
         * Establecemos un valor por defecto para el formulario con los datos que tenemos en la Prop datos
         * 
         */
        this.form = Object.entries(this.datos).reduce(function(objeto, entrada){
            let [clave, valor] = entrada;
            objeto[clave] = valor;
            return objeto;
        }, {});
    },
    methods: {
        
        /**
         * Crea una lista con las Props de los elementos de este formulario
         */
        listarHijos: function(formulario){
            let resultado = formulario.map(function(elemento){
                return elemento.$options.propsData;
            });
            return resultado;
        },

        verificarValidez: function(elemento){
            let valor = elemento.value;
            let identificador = elemento.uid;
            let validaciones = Array.isArray(elemento.validaciones) ? elemento.validaciones : [];

            let validacion = new Validacion(validaciones);
            let esValido = validacion.validar(valor);
            let errores = validacion.errores;
            return {identificador, esValido, errores};
        },

        listarErrores: function(elementos){
            let resultado = elementos.map(this.verificarValidez)
            .filter(function(elemento){
                return !elemento.esValido;
            })
            .reduce(function(objeto, elemento){
                objeto[elemento.identificador] = elemento.errores;
                return objeto;
            }, {});

            return resultado;
        },

        recolectarDatos: function(formulario, elementos){
            let resultado = elementos.reduce(function(objeto, elemento){
                let uid = elemento.uid;
                let valor = formulario[uid];
                objeto[uid] = valor;
                return objeto;
            }, {}); 

            return resultado;
        },

        envio: function(evento){
            evento.preventDefault();
            let vm = this;  
            
            let elementosHijos = this.listarHijos(vm.$children);

            vm.errores = vm.listarErrores(elementosHijos);

            if(Object.keys(vm.errores).length === 0){
                let datos = vm.recolectarDatos(vm.form, elementosHijos);
                vm.$peticion.post(this.endpoint, datos)
                    .then(function(response){
                        if(response.data.success === true){
                            vm.procesarRespuesta(response.data);
                        }
                    })
                    .catch(function(error){
                        vm.procesarError(error);
                    });
            };
        }
    },
}
</script>