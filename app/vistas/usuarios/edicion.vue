<script>
import Pikaday from 'pikaday';
import vtEntrada from './../../componentes/entrada.vue';
import vtAutocompleta from './../../componentes/autocompleta.vue';
import vtMultiautocompleta from './../../componentes/multiautocompleta.vue';
import vtFecha from './../../componentes/fecha.vue';
import vtSwitch from './../../componentes/switch.vue';
import { plantilla } from "./configuracion.js";

export default {
    name: 'vt-usuario-edicion',
    components: { vtEntrada, vtSwitch, Pikaday, vtFecha, vtAutocompleta, vtMultiautocompleta },
    props: ['usuario', 'establecimientos', 'grupos'],
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
        cambios: function(uid, modelo, validacion){
            let resultado = validacion ? "Inválido": "Válido";
            console.log('Sucede un algo en en ' + uid + ': "' + modelo + '" es ' + resultado );
        }
    },

}
</script>
<template>
    <div class="pure-u-1">
        <!-- Acá había un alert, acá habrá un alert -->
        <form class="pure-form jt-form" id="usuario" @submit="envio" novalidate>
            <fieldset>
                <legend>Datos Generales</legend>
                <div class="pure-g">

                    <!-- Nombre (givenname) siempre es obligatorio. No vamos a crear usuario sin al menos un nombre válido -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="givenName" etiqueta="Nombre" :modelo="usuario.givenName" @vt-cambio="cambios" :validaciones="['requerido', 'sustantivo', 'existente']">
                            <template slot="requerido"> El nombre es requerido </template>
                            <template slot="sustantivo"> Revise el nombre escrito </template>
                        </vt-entrada>
                    </div>
                       
                    <!-- Apellidos (sn) siempre es obligatorio, bajo las mismas condiciones que givenname -->
                    <div class="pure-u-1 pure-u-xl-1-2"> 
                        <vt-entrada uid="sn" etiqueta="Apellido" :modelo="usuario.sn" @vt-cambio="cambios" :validaciones="['requerido', 'sustantivo', 'existente']"></vt-entrada>
                    </div>
                   
                    <!-- DUI (dui) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="dui" etiqueta="DUI" :modelo="usuario.dui" @vt-cambio="cambios" :validaciones="['requerido', 'dui', 'existente']">
                            <template slot="dui"> Revise el DUI ingresado </template>
                        </vt-entrada>
                    </div>
                   
                    <!-- NIT (nit) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="nit" etiqueta="NIT" :modelo="usuario.nit" @vt-cambio="cambios" :validaciones="['requerido', 'nit', 'existente']"></vt-entrada>
                    </div>
            
                    <!-- JVS (jvs) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio cuando el control esta activo -->
<!--                     <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-switch uid="jvs" etiqueta="JVS" v-bind:modelo="userData.jvs" v-on:vt-cambio="cambios"></vt-switch>
                    </div> -->
            
                    <!-- Fecha de nacimiento (fecha) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-fecha uid="fecha" etiqueta="Fecha de nacimiento" :modelo="usuario.anio" @vt-cambio="cambios" :validaciones="['requerido', 'fecha', 'existente']"></vt-fecha>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>Atributos Administrativos</legend>
                <div class="pure-g">

                    <!-- establecimiento (o) siempre es obligatorio. TODO: Revisar que todos los establecimientos sean seleccionables -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="o" etiqueta="Establecimiento" v-bind:datos="establecimientos" v-bind:modelo="usuario.o" v-bind:validaciones="['requerido', 'listado', 'existente']"></vt-autocompleta>
                    </div>
                </div>
            </fieldset>

            <fieldset>    
                <legend>Atributos Posix y Samba</legend>

                <div class="pure-g">
                    <!-- Grupos Adicionales (grupos) no debería ser obligatorio. TODO: En realidad debería ser el control principal respecto a Grupo Principal -->
                    <div class="pure-u-1 pure-u-xl-1-2">
<!--                         <vt-multiautocompleta uid="o" etiqueta="Grupos Adicionales" v-bind:datos="grupos" v-bind:modelo="usuario.grupos" v-bind:validaciones="['requerido', 'existente']">
                            <template slot="requerido">Este mensaje esta lejos de casa</template>
                        </vt-multiautocompleta> -->
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