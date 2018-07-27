<script>
import vtEntrada from './../../componentes/entrada.vue';
import vtAutocompleta from './../../componentes/autocompleta.vue';
import vtFecha from './../../componentes/fecha.vue';
import vtSwitch from './../../componentes/switch.vue';

export default {
    name: 'vt-usuario-edicion',
    components: { vtEntrada, vtAutocompleta, vtFecha, vtSwitch },
    props: ['configuracion', 'datos', 'establecimientos', 'oficinas', 'grupos'],
    data: function(){
        return {
            usuario: this.datos,
            cambios: {},
            gruposSeleccionados: this.datos.grupos,
            shells: [
                {label: 'Bash', value: '/bin/bash'},
                {label: 'False', value: '/bin/false'}
            ]
        }
    },
    mounted: function(){
        /** Nos aseguramos de mostrarle al usuario las oficinas para su establecimiento */
        if (Number.isInteger(this.usuario.o)){
            this.$emit('vt-cambio-establecimiento', this.usuario.o);
        }

    },
    methods: {
        envio: function(e){
            e.preventDefault();
            let elementosVisibles = [];
            
            let f = document.getElementById('userForm');
            let ele = f.elements;
            for (let i = 0; i < ele.length; i++) {
                if(ele[i].type === "text"){
                    elementosVisibles.push(ele[i].id);
                }
            };

            /**
             * Guardamos los valores actuales: Los válidos del formulario, los por defecto
             */
            let tmp = {};
            elementosVisibles.map(function(elemento){
                tmp[elemento] = elemento in this.cambios ? this.cambios[elemento].modelo : this.usuario[elemento];
                debugger;
            }, this);
           
            /** 
             * Configuramos un valor cualquiera: No debería haber problemas
             * Excepto, claro, que no puede ser '' porque ese es el valor por defecto
             */
            elementosVisibles.forEach(function(e){
                this.usuario[e] = " ";
            }, this);
         
            /** 
             * Incluso funciona sin la promesa; igual queda más bonito
             * Parece que la promesa tiene su propio ámbito, ¿O es la función? Mira las cosas
             */
            let vm = this;
            this.$nextTick().then(
                function(){
                    elementosVisibles.forEach(function(e){
                        this.usuario[e] = tmp[e];
                    }, vm);
                }
            );
        },
        cambiar: function(uid, modelo, validacion){
            let resultado = validacion ? "Inválido": "Válido";
            console.log('Sucede un algo en en ' + uid + ': "' + modelo + '" es ' + resultado );

            /** 
             * Recuerda que validacion=false significa que estamos bien 
             * También recuerda que este no es reactivo, espero que poco importe 
             */
            this.cambios[uid] = {
                modelo,
                validacion,
            }

        },
        cambiarEstablecimiento: function(uid, modelo, validacion){
            this.cambiar(uid, modelo, validacion);
            if (!validacion){
                this.$emit('vt-cambio-establecimiento', modelo);
            }
        },
        cambiarGrupos: function(uid, modelo, validacion){
            this.cambiar(uid, modelo, validacion);
            if (!validacion){
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
        mostrar: function(elemento){
            let config = this.configuracion.componentes;
            /** Por defecto, vamos a mostrar todos los componentes */
            let mostrar = elemento in config ? config[elemento].mostrar : true;
            return mostrar;
        }
    },

}
</script>
<template>
    <div class="pure-u-1">
        <!-- Acá había un alert, acá habrá un alert -->
        <form class="pure-form jt-form" id="userForm" @submit="envio" novalidate>
            
            <fieldset>
                <legend>Datos Generales</legend>
                <div class="pure-g">

                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="givenName" etiqueta="Nombre" :modelo="usuario.givenName" @vt-cambio="cambiar" :validaciones="validacion('givenName')">
                            <template slot="requerido"> El nombre es requerido </template>
                            <template slot="sustantivo"> Revise el nombre escrito </template>
                        </vt-entrada>
                    </div>
                       
                    <div class="pure-u-1 pure-u-xl-1-2"> 
                        <vt-entrada uid="sn" etiqueta="Apellido" :modelo="usuario.sn" @vt-cambio="cambiar" :validaciones="validacion('sn')"></vt-entrada>
                    </div>
                   
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="dui" etiqueta="DUI" :modelo="usuario.dui" @vt-cambio="cambiar" :validaciones="validacion('dui')">
                            <template slot="dui"> Revise el DUI ingresado </template>
                        </vt-entrada>
                    </div>
                   
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="nit" etiqueta="NIT" :modelo="usuario.nit" @vt-cambio="cambiar" :validaciones="validacion('nit')"></vt-entrada>
                    </div>
            
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="jvs" etiqueta="JVS" :modelo="usuario.jvs" @vt-cambio="cambiar" :validaciones="validacion('jvs')"></vt-entrada>
                    </div>
            
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-fecha uid="fecha" etiqueta="Fecha de nacimiento" :modelo="usuario.fecha" @vt-cambio="cambiar" :validaciones="validacion('fecha')"></vt-fecha>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>Atributos Administrativos</legend>

                <div class="pure-g">

                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="o" etiqueta="Establecimiento" :modelo="usuario.o" @vt-cambio="cambiarEstablecimiento" :datos="establecimientos" :validaciones="validacion('o')">
                            <template slot="requerido">Debe escoger un establecimiento</template>
                            <template slot="existente">No puede borrar el establecimiento. Escoja otro válido</template>
                        </vt-autocompleta>
                    </div>

                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="ou" etiqueta="Oficina" :modelo="usuario.ou" @vt-cambio="cambiar" :datos="oficinas" :validaciones="validacion('ou')">
                            <template slot="requerido">Debe escoger una Oficina</template>
                            <template slot="existente">No puede borrar la Oficina. Escoja otro válido</template>
                        </vt-autocompleta>
                    </div>
                    
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="title" etiqueta="Cargo" :modelo="usuario.title" @vt-cambio="cambiar" :validaciones="validacion('title')"></vt-entrada>
                    </div>
            
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="telephoneNumber" etiqueta="Número teléfonico" :modelo="usuario.telephoneNumber" @vt-cambio="cambiar" :validaciones="validacion('telephoneNumber')"></vt-entrada>
                    </div>

                </div>
            </fieldset>

            <fieldset v-if="mostrar('samba')">    
                <legend>Atributos Posix y Samba</legend>

                <div class="pure-g">
                    <!-- Username (uid) es obligatorio cuando aparece en accion = "creacion" -->
                    <!-- TODO: Este campo no aparecerá siempre -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="uid" etiqueta="Username" :modelo="usuario.uid" @vt-cambio="cambiar" :validaciones="validacion('uid')"></vt-entrada>
                    </div>
                    
                    <!-- TODO: Hay que definir en la mejor manera posible la funcionalidad de este control -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <div class="pure-g jt-form-component">
                            <div class="pure-u-1">
                                <label>Estado de la cuenta</label>
                            </div>
                            <vt-switch uid="sambaAcctFlags" :modelo="usuario.sambaAcctFlags" @vt-cambio="cambiar"></vt-switch>
                        </div>
                    </div>
                    
                    <!-- Grupos Adicionales (grupos) no debería ser obligatorio. TODO: En realidad debería ser el control principal respecto a Grupo Principal -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="grupos" etiqueta="Grupos Posix" :modelo="usuario.grupos" @vt-cambio="cambiarGrupos" :datos="grupos" multiple :validaciones="validacion('grupos')">
                            <template slot="requerido">Al menos un grupo es requerido</template>
                        </vt-autocompleta>
                    </div>
                    
                    <!-- Grupo Principal (grupo) siempre es obligatorio cuando esta presente -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="grupo" etiqueta="Grupos Principal" :modelo="usuario.grupo" @vt-cambio="cambiar" :datos="grupos" :filtro="gruposSeleccionados" :validaciones="validacion('grupo')">
                            <template slot="requerido">Al menos un grupo es requerido</template>
                        </vt-autocompleta>
                    </div>
                    
                    <!-- Shell por defecto (shell) debería ser obligatoria. Nos aseguramos que tenga configurada /bin/false -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-autocompleta uid="loginShell" etiqueta="Shell predeterminada" :modelo="usuario.loginShell" @vt-cambio="cambiar" :datos="shells" :validaciones="validacion('loginShell')">
                            <template slot="requerido">Debe escoger una Shell Válida</template>
                        </vt-autocompleta>
                    </div>
                    
                </div>
            </fieldset>
    
            <fieldset v-if="mostrar('recuperacion')">
                <legend>Recuperación de Contraseña</legend>
    
                <div class="pure-g">

                    <!-- Pregunta Secreta (pregunta) es obligatorio cuando aparece en accion = "actualizacion", y como sólo aparecen allí no vale la pena hacer más trabajo -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="pregunta" etiqueta="Pregunta de Recuperación" :modelo="usuario.pregunta" @vt-cambio="cambiar" :validaciones="validacion('pregunta')"></vt-entrada>
                    </div>

                    <!-- Respuesta (respuesta) es obligatorio cuando aparece en accion = "actualizacion" -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <vt-entrada uid="respuesta" etiqueta="Respuesta" :modelo="usuario.respuesta" @vt-cambio="cambiar" :validaciones="validacion('respuesta')"></vt-entrada>
                    </div>
                </div>

            </fieldset>
    
            <fieldset v-if="mostrar('zimbra')">
                <legend>Atributos Zimbra</legend>
                <div class="pure-g">
                    
                    <!-- TODO: Hay que definir en la mejor manera posible la funcionalidad de este control, sobre todo su posición me parece -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <div class="pure-g jt-form-component">
                            <div class="pure-u-1">
                                <label>Estado del Buzón</label>
                            </div>
                            <vt-switch uid="buzonStatus" :modelo="usuario.buzonStatus" @vt-cambio="cambiar"></vt-switch>
                        </div>
                    </div>
                    
                    <!-- TODO: Hay que definir en la mejor manera posible la funcionalidad de este control, sobre todo su posición me parece -->
                    <div class="pure-u-1 pure-u-xl-1-2">
                        <div class="pure-g jt-form-component">
                            <div class="pure-u-1">
                                <label>Estado de la Cuenta</label>
                            </div>
                            <vt-switch uid="cuentaStatus" :modelo="usuario.cuentaStatus" @vt-cambio="cambiar"></vt-switch>
                        </div>
                    </div>

                    <!-- Tamaño del Buzón (volumenbuzon) es obligatorio, nos aseguramos que tenga configurado por defecto el menor tamaño posible -->
                    <div class="pure-u-1">
                        <div class="pure-g jt-form-component">
                            <label class="pure-u-1 " for="volumenbuzon">Tamaño del Buzón</label>
                            <select class="pure-u-1" id="volumenbuzon" name="volumenbuzon" ng-model="$ctrl.usuarioDetalle.volumenBuzon" ng-options="opcion.id as opcion.name for opcion in $ctrl.volumenes" ng-required="$ctrl.requerirCampo('volumenBuzon')">
                            </select>
                        </div>
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