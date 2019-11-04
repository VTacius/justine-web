<script>
import { vhttp } from './../../utils/peticion.js';
import vtEntrada from './../../componentes/entrada.vue';
import configuracion from './configuracion.js';

export default {
    name: 'vtViewLogin',
    components: { vtEntrada },
    configuracion,
    props: {
        redirect: {
            type: String,
            default: ''
        }
    },
    data: function(){
        return {
            usuario: '',
            contrasenia: '',
        }
    },
    mounted: function () {
        this.$emit('vt-cargado', false);
    },
    methods: {
        envio: function(e){
            e.preventDefault();
            this.$emit('vt-cargado', true);
            let username = document.getElementById('usuario');
            let password = document.getElementById('contrasenia');
            let credenciales = { username: username.value, password: password.value }; 
            let vm = this;
            vhttp.post('/auth/login', credenciales)
                .then(function(respuesta){
                    let redireccion = vm.redirect.length > 0 ? vm.redirect : '/';
                    vm.$cookie.set('logueado', true);
                    vm.$router.push(redireccion);
                })
                .catch(function(error){
                    console.log(error);
                }).then(function(){
                    vm.$emit('vt-cargado', false);
                });
        },
        validacion: function(elemento){
            return this.$options.configuracion[elemento].validacion;
        }
    }
}
</script>
<template>
	<div class="pure-u-1">
        <!-- TODO: Estoy casi seguro que esta no será la forma final de este formulario, por favor, algo especial no esta de más -->
        <form class="pure-form jt-form" id="login" @submit="envio" novalidate>
            <fieldset>
                <legend>Datos Generales</legend>
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="usuario" etiqueta="Usuario" :modelo="usuario" :validaciones="validacion('usuario')"></vt-entrada>
                    </div>
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="contrasenia" etiqueta="Contraseña" :modelo="contrasenia" :validaciones="validacion('contrasenia')"></vt-entrada>
                    </div>
                </div>
            </fieldset>
            
            <div class="pure-g">
                <div class="pure-u-1">
                    <div class="pure-g">
                        <div class="pure-u-1-2 jt-contenedor-boton-izquierda">
                            <button type="submit" class="button-success jt-boton-formulario pure-button">Enviar</button>
                        </div>
                        <div class="pure-u-1-2">
                            <button type="reset" class="button-warning jt-boton-formulario pure-button">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
