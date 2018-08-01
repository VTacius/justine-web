<script>
import vtEntrada from './../../componentes/entrada.vue';
import vtAutocompleta from './../../componentes/autocompleta.vue';
import vtFecha from './../../componentes/fecha.vue';
import vtSwitch from './../../componentes/switch.vue';

export default {
    name: 'vt-usuario-formulario',
    components: { vtEntrada, vtAutocompleta, vtFecha, vtSwitch },
    props: ['configuracion', 'datos', 'establecimientos', 'oficinas', 'grupos'],
    data: function(){
        return {
            editado: false,
            usuario: this.datos,
            cambios: {},
            gruposSeleccionados: this.datos.grupos,
            shells: [
                {label: 'Bash', value: '/bin/bash'},
                {label: 'False', value: '/bin/false'}
            ]
        }
    },
    /** TODO: ¿Podríamos usar directamente a datos? */
    watch: {
        datos: function(valor) {
            this.usuario = valor;
        }   
    },
    mounted: function(){
        /** Nos aseguramos de mostrarle al usuario las oficinas para su establecimiento */
        if (Number.isInteger(this.usuario.o)){
            this.$emit('vt-cambio-establecimiento', this.usuario.o);
        }

    },
    methods: {
        /** El reseteo del formulario */
        reseteo: function(ele){
            ele.preventDefault();

            this.$emit('vt-reseteo');
        },
        /** El envío de los datos a la API */
        envio: function(ele){
            ele.preventDefault();
            let vm = this;
            
            let elementos = this.elementosVisibles('userForm');
            this.forzarValidacionFormulario(elementos, this.cambios, this.usuario);
            setTimeout(function () {
                let validez = vm.verificaEstadoFormulario(elementos, vm.cambios, vm.usuario);
                if (validez){
                    console.log('Estamos pronto a enviar los siguientes datos');
                    console.log(vm.usuario);
                } else {
                    console.log('¿Que podemos hacer? ¿Desactivar el botón?');
                }
            }, 200);
        },
        elementosVisibles: function(formulario){
            let elementos = [];
            let f = document.getElementById(formulario);
            let ele = f.elements;
            for (let i = 0; i < ele.length; i++) {
                if(ele[i].type === "text"){
                    elementos.push(ele[i].id);
                }
            };
            return elementos;

        },
        forzarValidacionFormulario: function(elementos, cambio, original){
            /** Todo este código esta tan mal hecho que me quita el sueño */
            let tmp = {};
            elementos.map(function(elemento){
                tmp[elemento] = (elemento in cambio) ? cambio[elemento].modelo : original[elemento];
                original[elemento] = ' ';
            })
            
            this.$nextTick().then(function(){
                elementos.forEach(function(e){
                    original[e] = tmp[e];
                });
            });
        },
        verificaEstadoFormulario: function(elementos, cambio, original){
            /** 
             * TODO: Una vez resuelto lo anterior, ¿Un reduce no sería genial?
             * Respuesta: No, no va a funcionar
             */
            let validez = true;
            elementos.map(function(elemento){
                if (elemento in cambio){
                    validez = validez && cambio[elemento].validacion;
                } 
            });
            return validez;
        },
        cambiar: function(uid, modelo, validacion){
            /* Este mensaje es más bien una debugeo chambón */
            let resultado = validacion ? "Válido" : "Inválido";

            /** Desde la primer carga del formulario, resulta que este ya fue manipulado */
            this.editado = true;
            /* console.log('Sucede un algo en en ' + uid + ': "' + modelo + '" es ' + resultado ); */ 

            /** Recuerda que este no es reactivo, espero que poco importe */
            this.cambios[uid] = {
                modelo,
                validacion,
            }

        },
        cambiarEstablecimiento: function(uid, modelo, validacion){
            this.cambiar(uid, modelo, validacion);
            if (validacion){
                this.$emit('vt-cambio-establecimiento', modelo);
            }
        },
        cambiarGrupos: function(uid, modelo, validacion){
            this.cambiar(uid, modelo, validacion);
            if (validacion){
                this.gruposSeleccionados = modelo;
            }
        },
        /** 
         * TODO: Ahora que quiero hacerlo en otra parte, me doy cuenta que puede que esta no sea la mejor manera
         * TODO: ¿MIXIN?
         */
        validacion: function(elemento){
            let config = this.configuracion;
            let validacion = elemento in config ? config[elemento].validacion : [''];
            return validacion;
        },
        /**
         * Algunos componentes como fieldset se encuentran en un compartimento diferente, 
         * los controles de formulario suelen llevar la configuración consigo mismos
         */
        mostrar: function(elemento){
            let cfg = this.configuracion; 
            let config = elemento in cfg.componentes ? cfg.componentes : cfg;
            /** Por defecto, vamos a mostrar todos los componentes */
            let mostrar = elemento in config ? config[elemento].mostrar : true;
            return mostrar;
        }
    },

}
</script>
<template>
        <!-- Acá había un alert, acá habrá un alert -->
    <form class="pure-form" id="userForm" @submit="envio" novalidate>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-xl-3-5">
                <fieldset>
                    <legend>Datos Generales</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="givenName" etiqueta="Nombre" :modelo="usuario.givenName" @vt-cambio="cambiar" :validaciones="validacion('givenName')">
                                <template slot="requerido"> El nombre es requerido </template>
                                <template slot="sustantivo"> Revise el nombre escrito </template>
                            </vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2"> 
                            <vt-entrada uid="sn" etiqueta="Apellido" :modelo="usuario.sn" @vt-cambio="cambiar" :validaciones="validacion('sn')"></vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="dui" etiqueta="DUI" :modelo="usuario.dui" @vt-cambio="cambiar" :validaciones="validacion('dui')">
                                <template slot="dui"> Revise el DUI ingresado </template>
                            </vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="nit" etiqueta="NIT" :modelo="usuario.nit" @vt-cambio="cambiar" :validaciones="validacion('nit')"></vt-entrada>
                        </div>
            
                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="jvs" etiqueta="JVS" :modelo="usuario.jvs" @vt-cambio="cambiar" :validaciones="validacion('jvs')"></vt-entrada>
                        </div>
            
                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-fecha uid="fecha" etiqueta="Fecha de nacimiento" :modelo="usuario.fecha" @vt-cambio="cambiar" :validaciones="validacion('fecha')"></vt-fecha>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Atributos Administrativos</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="o" etiqueta="Establecimiento" :modelo="usuario.o" @vt-cambio="cambiarEstablecimiento" :datos="establecimientos" :validaciones="validacion('o')">
                                <template slot="requerido">Debe escoger un establecimiento</template>
                                <template slot="existente">No puede borrar el establecimiento. Escoja otro válido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="ou" etiqueta="Oficina" :modelo="usuario.ou" @vt-cambio="cambiar" :datos="oficinas" :validaciones="validacion('ou')">
                                <template slot="requerido">Debe escoger una Oficina</template>
                                <template slot="existente">No puede borrar la Oficina. Escoja otro válido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="title" etiqueta="Cargo" :modelo="usuario.title" @vt-cambio="cambiar" :validaciones="validacion('title')"></vt-entrada>
                        </div>
            
                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="telephoneNumber" etiqueta="Número teléfonico" :modelo="usuario.telephoneNumber" @vt-cambio="cambiar" :validaciones="validacion('telephoneNumber')"></vt-entrada>
                        </div>

                    </div>
                </fieldset>

                <fieldset v-if="mostrar('samba')">    
                    <legend>Atributos Posix y Samba</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-lg-1-2" v-if="mostrar('uid')">
                            <vt-entrada uid="uid" etiqueta="Username" :modelo="usuario.uid" @vt-cambio="cambiar" :validaciones="validacion('uid')"></vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <div class="pure-g jt-form-component">
                                <div class="pure-u-1">
                                    <label>Estado de la cuenta</label>
                                </div>
                                <vt-switch uid="sambaAcctFlags" :modelo="usuario.sambaAcctFlags" @vt-cambio="cambiar"></vt-switch>
                            </div>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="grupos" etiqueta="Grupos Posix" :modelo="usuario.grupos" @vt-cambio="cambiarGrupos" :datos="grupos" multiple :validaciones="validacion('grupos')">
                                <template slot="requerido">Al menos un grupo es requerido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="grupo" etiqueta="Grupos Principal" :modelo="usuario.grupo" @vt-cambio="cambiar" :datos="grupos" :filtro="gruposSeleccionados" :validaciones="validacion('grupo')">
                                <template slot="requerido">Al menos un grupo es requerido</template>
                            </vt-autocompleta>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-autocompleta uid="loginShell" etiqueta="Shell predeterminada" :modelo="usuario.loginShell" @vt-cambio="cambiar" :datos="shells" :validaciones="validacion('loginShell')">
                                <template slot="requerido">Debe escoger una Shell Válida</template>
                            </vt-autocompleta>
                        </div>

                    </div>
                </fieldset>
    
                <fieldset v-if="mostrar('recuperacion')">
                    <legend>Recuperación de Contraseña</legend>
                    <div class="pure-g">

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="pregunta" etiqueta="Pregunta de Recuperación" :modelo="usuario.pregunta" @vt-cambio="cambiar" :validaciones="validacion('pregunta')"></vt-entrada>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="respuesta" etiqueta="Respuesta" :modelo="usuario.respuesta" @vt-cambio="cambiar" :validaciones="validacion('respuesta')"></vt-entrada>
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
                                <vt-switch uid="buzonStatus" :modelo="usuario.buzonStatus" @vt-cambio="cambiar"></vt-switch>
                            </div>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <div class="pure-g jt-form-component">
                                <div class="pure-u-1">
                                    <label>Estado de la Cuenta</label>
                                </div>
                                <vt-switch uid="cuentaStatus" :modelo="usuario.cuentaStatus" @vt-cambio="cambiar"></vt-switch>
                            </div>
                        </div>

                        <div class="pure-u-1 pure-u-lg-1-2">
                            <vt-entrada uid="buzonVolumen" etiqueta="Tamaño del buzón" :modelo="usuario.buzonVolumen" @vt-cambio="cambiar" :validaciones="validacion('buzonVolumen')"></vt-entrada>
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
