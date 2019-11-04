<script>
import vtEntrada from './../../componentes/entrada.vue';
import vtSwitch from './../../componentes/switch.vue';
import vtAutocompleta from './../../componentes/autocompleta.vue';
import vtFecha from './../../componentes/fecha.vue';
import formularioBase from './../../mixins/formularioBase.js'

export default {
    name: 'vtFormularioEquipos',
    mixins: [ formularioBase ],
    components: { vtEntrada, vtAutocompleta, vtFecha, vtSwitch },
    props: ['configuracion', 'modelo', 'establecimientos', 'oficinas', 'grupos'],
    data: function(){
        return {
            datos: this.modelo,
            gruposSeleccionados: this.modelo.grupos,
            shells: [
                {label: 'Bash', value: '/bin/bash'},
                {label: 'False', value: '/bin/false'}
            ]
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
                        /** 
                         * TODO: Aún falta procesar los datos para que sólo envie los 
                         * de los referentes a los controles activos
                         */
                        this.$emit('vt-envio', vm.datos);
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
            this.$emit('vt-reseteo'); 
            return;
        },
        registrarCambioEstablecimiento: function(uid, modelo, validacion){
            this.registrarCambio(uid, modelo, validacion);
            if (validacion){
                this.$emit('vt-cambio-establecimiento', modelo);
            }
        },
        registrarCambioGrupos: function(uid, modelo, validacion){
            this.registrarCambio(uid, modelo, validacion);
            this.gruposSeleccionados = modelo;
        }
    }
}
</script>
<template>
    <form class="pure-form" :id="idFormulario" @submit="envio" novalidate>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-xl-3-5">
                <fieldset>
                    <legend>Datos Generales</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="givenName" etiqueta="Nombre" :modelo="datos.givenName" @vt-cambio="registrarCambio" :validaciones="validacion('givenName')">
                                <template slot="requerido"> El nombre es requerido </template>
                                <template slot="sustantivo"> Revise el nombre escrito </template>
                            </vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2"> 
                            <vt-entrada uid="sn" etiqueta="Apellido" :modelo="datos.sn" @vt-cambio="registrarCambio" :validaciones="validacion('sn')"></vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="dui" etiqueta="DUI" :modelo="datos.dui" @vt-cambio="registrarCambio" :validaciones="validacion('dui')">
                                <template slot="dui"> Revise el DUI ingresado </template>
                            </vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="nit" etiqueta="NIT" :modelo="datos.nit" @vt-cambio="registrarCambio" :validaciones="validacion('nit')"></vt-entrada>
                        </div>
            
                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="jvs" etiqueta="JVS" :modelo="datos.jvs" @vt-cambio="registrarCambio" :validaciones="validacion('jvs')"></vt-entrada>
                        </div>
            
                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-fecha uid="fecha" etiqueta="Fecha de nacimiento" :modelo="datos.fecha" @vt-cambio="registrarCambio" :validaciones="validacion('fecha')"></vt-fecha>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Atributos Administrativos</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="o" etiqueta="Establecimiento" :modelo="datos.o" @vt-cambio="registrarCambioEstablecimiento" :datos="establecimientos" :validaciones="validacion('o')">
                                <template slot="requerido">Debe escoger un establecimiento</template>
                                <template slot="existente">No puede borrar el establecimiento. Escoja otro válido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="ou" etiqueta="Oficina" :modelo="datos.ou" @vt-cambio="registrarCambio" :datos="oficinas" :validaciones="validacion('ou')">
                                <template slot="requerido">Debe escoger una Oficina</template>
                                <template slot="existente">No puede borrar la Oficina. Escoja otro válido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="title" etiqueta="Cargo" :modelo="datos.title" @vt-cambio="registrarCambio" :validaciones="validacion('title')"></vt-entrada>
                        </div>
            
                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="telephoneNumber" etiqueta="Número teléfonico" :modelo="datos.telephoneNumber" @vt-cambio="registrarCambio" :validaciones="validacion('telephoneNumber')"></vt-entrada>
                        </div>

                    </div>
                </fieldset>

                <fieldset v-if="mostrar('samba')">    
                    <legend>Atributos Posix y Samba</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-lg-1-2" v-if="mostrar('uid')">
                            <vt-entrada uid="uid" etiqueta="Username" :modelo="datos.uid" @vt-cambio="registrarCambio" :validaciones="validacion('uid')"></vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <div class="pure-g jt-form-component">
                                <div class="pure-u-1">
                                    <label>Estado de la cuenta</label>
                                </div>
                                <vt-switch uid="sambaAcctFlags" :modelo="datos.sambaAcctFlags" @vt-cambio="registrarCambio"></vt-switch>
                            </div>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="grupos" etiqueta="Grupos Posix" :modelo="datos.grupos" @vt-cambio="registrarCambioGrupos" :datos="grupos" multiple :validaciones="validacion('grupos')">
                                <template slot="requerido">Al menos un grupo es requerido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="grupo" etiqueta="Grupos Principal" :modelo="datos.grupo" @vt-cambio="registrarCambio" :datos="grupos" :filtro="gruposSeleccionados" :validaciones="validacion('grupo')">
                                <template slot="requerido">Al menos un grupo es requerido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="loginShell" etiqueta="Shell predeterminada" :modelo="datos.loginShell" @vt-cambio="registrarCambio" :datos="shells" :validaciones="validacion('loginShell')">
                                <template slot="requerido">Debe escoger una Shell Válida</template>
                            </vt-autocompleta>
                        </div>

                    </div>
                </fieldset>
    
                <fieldset v-if="mostrar('recuperacion')">
                    <legend>Recuperación de Contraseña</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="pregunta" etiqueta="Pregunta de Recuperación" :modelo="datos.pregunta" @vt-cambio="registrarCambio" :validaciones="validacion('pregunta')"></vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="respuesta" etiqueta="Respuesta" :modelo="datos.respuesta" @vt-cambio="registrarCambio" :validaciones="validacion('respuesta')"></vt-entrada>
                        </div>
                    </div>

                </fieldset>

            </div>    
            <div class="pure-u-1 pure-u-xl-2-5">            
                <fieldset v-if="mostrar('zimbra')">
                    <legend>Atributos Zimbra</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <div class="pure-g jt-form-component">
                                <div class="pure-u-1">
                                    <label>Estado del Buzón</label>
                                </div>
                                <vt-switch uid="buzonStatus" :modelo="datos.buzonStatus" @vt-cambio="registrarCambio"></vt-switch>
                            </div>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <div class="pure-g jt-form-component">
                                <div class="pure-u-1">
                                    <label>Estado de la Cuenta</label>
                                </div>
                                <vt-switch uid="cuentaStatus" :modelo="datos.cuentaStatus" @vt-cambio="registrarCambio"></vt-switch>
                            </div>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="buzonVolumen" etiqueta="Tamaño del buzón" :modelo="datos.buzonVolumen" @vt-cambio="registrarCambio" :validaciones="validacion('buzonVolumen')"></vt-entrada>
                        </div>

                    </div>
                </fieldset>
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

