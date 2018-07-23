<script>
import vtEntrada from './../../componentes/entrada.vue';
import vtSeleccionador from './../../componentes/seleccionador.vue'
import vtAutocompleta from './../../componentes/autocompleta.vue';
import vtMultiautocompleta from './../../componentes/multiautocompleta.vue';
import vtFecha from './../../componentes/fecha.vue';
import vtSwitch from './../../componentes/switch.vue';
import { plantilla } from "./configuracion.js";

export default {
    name: 'vt-usuario-edicion',
    configuracion: plantilla,
    components: { vtEntrada, vtSeleccionador, vtAutocompleta, vtMultiautocompleta, vtFecha, vtSwitch },
    props: ['configuracion', 'usuario', 'establecimientos', 'oficinas', 'grupos'],
    data: function(){
        return {
           gruposSeleccionados: this.usuario.grupos,
        }
    },
    methods: {
        envio: function(e){
            /**
             * console.log(this.usuario.givenName);
             * console.log(this.usuario.sn);
             * console.log(this.usuario.dui);
             * console.log(this.usuario.nit);
             */
            e.preventDefault();
        },
        cambios: function(uid, modelo, validacion){
            let resultado = validacion ? "Inválido": "Válido";
            console.log('Sucede un algo en en ' + uid + ': "' + modelo + '" es ' + resultado );
        },
        cambiosEstablecimiento: function(uid, modelo, validacion){
            this.cambios(uid, modelo, validacion);
            if (!validacion){
                this.$emit('vt-cambio-establecimiento', modelo);
            }
        },
        cambiosGrupos: function(uid, modelo, validacion){
            this.cambios(uid, modelo, validacion);
            if (!validacion){
                this.gruposSeleccionados = modelo;
            }

        },
        validacion: function(elemento){
            return this.$options.configuracion[elemento].validacion;
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
                        <vt-entrada uid="givenName" etiqueta="Nombre" :modelo="usuario.givenName" @vt-cambio="cambios" :validaciones="validacion('givenName')">
                            <template slot="requerido"> El nombre es requerido </template>
                            <template slot="sustantivo"> Revise el nombre escrito </template>
                        </vt-entrada>
                    </div>
                       
                    <!-- Apellidos (sn) siempre es obligatorio, bajo las mismas condiciones que givenname -->
                    <div class="pure-u-1 pure-u-xl-1-2"> 
                        <vt-entrada uid="sn" etiqueta="Apellido" :modelo="usuario.sn" @vt-cambio="cambios" :validaciones="validacion('sn')"></vt-entrada>
                    </div>
                   
                    <!-- DUI (dui) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="dui" etiqueta="DUI" :modelo="usuario.dui" @vt-cambio="cambios" :validaciones="validacion('dui')">
                            <template slot="dui"> Revise el DUI ingresado </template>
                        </vt-entrada>
                    </div>
                   
                    <!-- NIT (nit) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="nit" etiqueta="NIT" :modelo="usuario.nit" @vt-cambio="cambios" :validaciones="validacion('nit')"></vt-entrada>
                    </div>
            
                    <!-- JVS (jvs) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio cuando el control esta activo -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="jvs" etiqueta="JVS" :modelo="usuario.jvs" @vt-cambio="cambios" :validaciones="validacion('jvs')"></vt-entrada>
                    </div>
            
                    <!-- Fecha de nacimiento (fecha) no es obligatorio en creación, en edición es obligatorio si ya ha sido configurado antes y con actualización siempre es obligatorio -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-fecha uid="fecha" etiqueta="Fecha de nacimiento" :modelo="usuario.fecha" @vt-cambio="cambios" :validaciones="validacion('fecha')"></vt-fecha>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>Atributos Administrativos</legend>
                <div class="pure-g">

                    <!-- establecimiento (o) siempre es obligatorio. TODO: Revisar que todos los establecimientos sean seleccionables -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="o" etiqueta="Establecimiento" :modelo="usuario.o" @vt-cambio="cambiosEstablecimiento" :datos="establecimientos" :validaciones="validacion('o')">
                            <template slot="requerido">Debe escoger un establecimiento</template>
                            <template slot="listado">No es un establecimiento válido</template>
                            <template slot="existente">No puede borrar el establecimiento. Escoja otro válido</template>
                        </vt-autocompleta>
                    </div>

                    <!-- Oficina (ou) es obligatorio siempre que haya sugerencias que mostrar. -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="ou" etiqueta="Oficina" :modelo="usuario.ou" @vt-cambio="cambios" :datos="oficinas" :validaciones="validacion('ou')">
                            <template slot="requerido">Debe escoger una Oficina</template>
                            <template slot="listado">No es una Oficina válida</template>
                            <template slot="existente">No puede borrar la Oficina. Escoja otro válido</template>
                        </vt-autocompleta>
                    </div>
                </div>
            </fieldset>

            <fieldset>    
                <legend>Atributos Posix y Samba</legend>

                <div class="pure-g">
                    
                    <!-- Grupos Adicionales (grupos) no debería ser obligatorio. TODO: En realidad debería ser el control principal respecto a Grupo Principal -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-multiautocompleta uid="grupos" etiqueta="Grupos Posix" :modelo="usuario.grupos" @vt-cambio="cambiosGrupos" :datos="grupos" :validaciones="validacion('grupos')">
                            <template slot="requerido">Al menos un grupo es requerido</template>
                        </vt-multiautocompleta>
                    </div>
                    
                    <!-- Grupo Principal (grupo) siempre es obligatorio cuando esta presente -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-seleccionador uid="grupo" etiqueta="Grupo Principal" :modelo="usuario.grupo" @vt-cambio="cambios" :datos="grupos" :filtro="gruposSeleccionados" :validaciones="validacion('grupos')">
                            <template slot="requerido">Al menos un grupo es requerido</template>
                        </vt-seleccionador>
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