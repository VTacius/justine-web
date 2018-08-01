<script>
import vtEntrada from './../../componentes/entrada.vue';
import formularioBase from './../../mixins/formularioBase.js'

export default {
    name: 'vtFormularioEquipos',
    mixins: [ formularioBase ],
    components: { vtEntrada },
    data: function(){
        return {
            datos: this.modelo,
            cambios: {},
            valido: true,
            editado: false,
        }
    },
    created: function(){
        this.idFormulario = 'equiposFormulario'
    },
    methods: {
        /** Esta implementacion debería ser algo bastante propio de cada formulario. ¿O no? */
        envio: function(ele){
            ele.preventDefault();
            
            let vm = this;
            let elementos = this.listarElementosVisibles();

            /** Cambiamos cada indice a un valor diferente */
            let tmp = {};
            elementos.map(function(elemento){
                tmp[elemento] = elemento in vm.cambios ? vm.cambios[elemento].valor : vm.datos[elemento];
                vm.datos[elemento] = ' ';
            });

            this.$nextTick().then(function(){
                elementos.map(function(elemento){
                    vm.datos[elemento] = tmp[elemento];
                });
                vm.$nextTick().then(function(){
                    let items = Object.keys(vm.cambios);
                    let validacion = true;
                    items.map(function (elemento) {
                        if (elemento in vm.cambios){
                            validacion = validacion && vm.cambios[elemento].validacion;
                        } else {
                            console.log('A esta altura, ' + elemento + 'no cambio');
                        }
                    });
                    if (validacion){
                        console.log('Estoy por enviar estos datos para su procesamiento');
                        console.log(vm.datos);
                        console.log(vm.cambios);
                    } else {
                        console.log('Tengo datos inválidos');
                    }
                });
                return;
            });
            
        },
        /** Esta implementacion debería ser algo bastante propio de cada formulario. ¿O no? */
        reseteo: function(ele){
            ele.preventDefault();
            
            return;
        },
        registrarCambio(uid, valor, validacion){
            console.log('formulario: He registrado un cambio de valor en ' + uid + ' por ' + valor + ' la cual es ' + validacion);
            this.editado = true;
            this.cambios[uid] = {
                valor,
                validacion
            }
        }
    }
}
</script>
<template>
    <form class="pure-form" :id="idFormulario" @submit="envio" novalidate>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-3">
                <vt-entrada uid="hostname" etiqueta="Nombre de Host" :modelo="datos.hostname" :validaciones="validacion('hostname')" @vt-cambio="registrarCambio"></vt-entrada>
            </div>                
            <div class="pure-u-1 pure-u-md-1-3">
                <vt-entrada uid="descripcion" etiqueta="Descripción" :modelo="datos.descripcion" :validaciones="validacion('descripcion')" @vt-cambio="registrarCambio"></vt-entrada>
            </div>                
        </div>
        
        <div class="pure-g">
            <div class="pure-u-1">
                <p> Veredito: <span v-show="!valido">Es inválido, no enviaré nada</span> </p>
            </div>

        </div>
        <div class="pure-g">
            <div class="pure-u-1-2 jt-contenedor-boton-izquierda">
                <button type="submit" class="button-success jt-boton-formulario pure-button">Enviar</button>
            </div>
            <div class="pure-u-1-2">
                <button type="reset" class="button-warning jt-boton-formulario pure-button" @click="reseteo">Cancelar</button>
            </div>
        </div>
    </form>
</template>

