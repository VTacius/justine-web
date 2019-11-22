<template>
  
</template>

<script>
export default {
    name: 'vtIndex',
    data: function(){
        return {
            endpoint: {
                base: '',
                busqueda: ''
            },
            attrId: '',
            attrFiltros: [],
            limite: 2000,
            filtro: '',
            filtroViejo: ' ',
            datos: [],
            operacional: false,
        }
    },
    mounted: function(){
        let vm = this; 
        vm.$peticion.get(this.endpoint.base)
            .then(function(response){
                vm.datos = response.data;
                vm.operacional = true;
            })
            .catch(function(error){
                console.log(error);
            });
    },
    methods: {
        /** TODO: Aún podrías usar una librería externa si eso quieres */
        filtrarDatos: function(datos, atributos, filtro){
            return datos.filter(function(elemento){
                let dato = filtro.toLowerCase();
                let validos = atributos.filter(function(attr){
                    let valor = attr in elemento ? elemento[attr] : 1;
                    if (typeof(valor)==='string'){
                        return valor.toLocaleLowerCase().search(dato.toLowerCase()) >= 0;
                    } else {
                        return false
                    }
                });
                return validos.length > 0;
          });
        },

        /**
         * Agrega los items del arreglo primario al arreglo secundario,
         * siempre y cuando estos no existan ya, comparando según el atributos dado
         */
        combinar: function(atributo, primario, secundario){
            let lus = secundario.map(function(elemento){
                return elemento[atributo];
            });

            return secundario.concat(primario.filter(function(elemento){
                return ! lus.includes(elemento[atributo])
            }));
        },
       
        /** Devuelve una Promesa de la búsqueda de más datos */
        obtenerMasDatos: async function(filtro){
            console.log('Voy a buscar usuarios');
            let parametros = {params: {q: filtro}};
            try {
                return this.$peticion.get(this.endpoint.busqueda, parametros)
            } catch(error){
                console.log('Error Desde La búsqueda');
                console.log(error);
                return this.datos;
            }
        },

        filtrar: function(retroceso, datos, filtro){
            console.log('Estoy por filtrar datos');
            let resultado = this.filtrarDatos(datos, this.attrFiltros, filtro);
            if (resultado.length > 5){
                return resultado
            } else if (!retroceso) {
                /** No hará más mientras hacemos la consulta con los datos */
                let vm = this;
                this.operacional = false;
                this.obtenerMasDatos(filtro)
                    .then(function(respuesta){
                        console.log(respuesta.data);
                        vm.datos = vm.combinar(vm.attrId, vm.datos, respuesta.data.items);
                        vm.operacional = true;
                        return respuesta.data.items;
                    })
                    .catch(function(error){
                        console.log('Error desde filtrar');
                        console.log(error);
                        vm.operacional = true;
                        return vm.datos;
                    });
                return resultado;
            } else {
                return this.datos;
            }
            
        }
    },
    computed: {
        listaItems: function(){
            let esFiltro = this.filtro !== this.filtroViejo; 
            let estoyRetrocediendo = this.filtroViejo.length > this.filtro.length;
            this.filtroViejo = this.filtro;
            console.log('Detecte un cambio en alguno de los dos');
            console.log(this.operacional);
            if (this.operacional && esFiltro){
                console.log('Estoy operacional, así que los trabajaré');
                return this.filtrar(estoyRetrocediendo, this.datos, this.filtro);
            } else {
                console.log('No estoy operacional, te daré los datos que ya tenías')
                return this.datos;
            }
        }
    }
}
</script>

<style>

</style>