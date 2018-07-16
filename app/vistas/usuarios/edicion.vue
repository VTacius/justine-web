<script>
import Pikaday from 'pikaday';
import vtEntrada from './../../componentes/entrada.vue';
import vtFecha from './../../componentes/fecha.vue';
import vtSwitch from './../../componentes/switch.vue';
import { Validar } from './../validacion.js';
import { plantilla } from "./configuracion.js";

export default {
    name: 'vt-usuario-edicion',
    components: { vtEntrada, vtSwitch, Pikaday, vtFecha },
    props: ['usuario'],
    computed: {
        userData: function(){
            var datos = this.usuario;
            var objeto = {};
            Object.keys(datos).forEach(function(k){
                objeto[k] = {
                    valor: datos[k],
                    error: {
                        requerido: false,
                        sustantivo: false,
                        existente: false
                    }
                }
                
            });
            return objeto; 
        }
    },
    methods: {
        envio: function(e){
            /*
            console.log(this.usuario.givenName);
            console.log(this.usuario.sn);
            console.log(this.usuario.dui);
            console.log(this.usuario.nit);
            */
            e.preventDefault();
        },
        cambios: function(evento, modelo){
            console.log(evento);
            console.log(modelo);
            var validar = new Validar(plantilla, this.usuario);
            validar.verificar(evento.target.id, modelo);
        },
        cambiosFecha: function(fecha){
            console.log(fecha);
        }
    },

}
</script>
<template>
    <div class="pure-u-1">
        <!-- Acá había un alert, acá habrá un alert -->
        <form class="pure-form jt-form" id="usuario" @submit="envio" novalidate>
            <fieldset>
                <legend>Datos Generales {{userData.sn.valor}}</legend>
                <div class="pure-g">

                    <!-- Nombre (givenname) siempre es obligatorio. No vamos a crear usuario sin al menos un nombre válido -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="givenName" etiqueta="Nombre" v-bind:modelo="userData.givenName" v-on:vt-cambio="cambios">
                            <template slot="requerido"> El nombre es requerido </template>
                            <template slot="sustantivo"> Revise el nombre escrito </template>
                        </vt-entrada>
                    </div>
                       
                    <!-- Apellidos (sn) siempre es obligatorio, bajo las mismas condiciones que givenname -->
                    <div class="pure-u-1 pure-u-xl-1-2"> 
                        <vt-entrada uid="sn" etiqueta="Apellido" v-bind:modelo="userData.sn" v-on:vt-cambio="cambios"></vt-entrada>
                    </div>
                   
                    <!-- DUI (dui) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="dui" etiqueta="DUI" v-bind:modelo="userData.dui" v-on:vt-cambio="cambios"></vt-entrada>
                    </div>
                   
                    <!-- NIT (nit) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="nit" etiqueta="NIT" v-bind:modelo="userData.nit" v-on:vt-cambio="cambios"></vt-entrada>
                    </div>
            
                    <!-- JVS (jvs) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio cuando el control esta activo -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-switch uid="jvs" etiqueta="JVS" v-bind:modelo="userData.jvs" v-on:vt-cambio="cambios"></vt-switch>
                    </div>
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-fecha uid="fecha" etiqueta="Fecha de nacimiento" v-bind:modelo="userData.anio" v-on:vt-cambio="cambios"></vt-fecha>
                    </div>
                </div>
            </fieldset>
    
            <div class="pure-g">
                <div class="pure-u-1">
                    <div class="pure-g jt-form-component">
                        <div class="pure-u-1-2 jt-contenedor-boton-izquierda">
                            <button type="submit" class="button-success jt-boton-formulario pure-button">Enviar</button>
                        </div>
                        <div class="pure-u-1-2 jt-contenedor-boton-derecha">
                            <button type="button" class="button-warning jt-boton-formulario pure-button">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
</template>