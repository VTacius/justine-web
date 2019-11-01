<script>

import vtPanel from './../../componentes/panel.vue';
import vtPanelUsuarios from './panel.vue';
import vtUsuarioDetalle from './detalle.vue';
import vtUsuarioFormulario from './formulario.vue';
import vtUsuarioBorrado from './borrado.vue';
import vistaBase from './../../mixins/vistaBase.js';
import { edicion } from "./configuracion.js";

export default {
    name: 'vtPrincipalUsuarios',
    mixins: [ vistaBase ],
    components: { vtPanel, vtPanelUsuarios, vtUsuarioDetalle, vtUsuarioFormulario, vtUsuarioBorrado},
    data: function(){
        return {
            filtroBusqueda: '',
            datos :	[],
            configuracion: edicion,
            establecimientos : [],
            oficinas: [],
            grupos : []
        };
    },
    created: function () {
        this.peticion('/grupos', this, 'grupos', 'lista');
        this.peticion('/establecimientos', this, 'establecimientos', 'lista');
        this.peticion('/usuarios', this, 'datos', 'listado', true);
    },
    methods: {
        obtenerOficina: function(establecimiento){
            this.peticion('/oficinas/' + establecimiento, this, 'oficinas', 'lista');
        },
        enviaDatos: function(datos){
            console.log(datos);
        },
        reseteaFormulario: function(){
            this.cargado = false;
            this.$nextTick(function(){
                this.cargado = true;
            });
        },
    }
}
</script>
<template>
	<div class="pure-u-1">
		<div class="contenido">
	        <!-- TODO: Una alerta iba aquí. Una alerta deberá haber aquí -->
	        <form class="pure-form jt-form jt-formulario-busqueda" novalidate>
	            <div class="jt-input-iconico">
	                <i class="fa fa-search jt-input-iconico-ico"></i>
	                <input class="pure-u-1 jt-input-iconico-in" type="text" v-model="filtroBusqueda">
	            </div>
	        </form>
	    </div>
		<div class="contenido">
	        <table class="pure-table pure-table-horizontal">
	            <tbody>
	                <tr v-for="row in datos" v-bind:key="row.uid"> 
	                	<vt-panel v-bind:entidad="row">
                            <template slot="entidad">
                                <vt-panel-usuarios 
                                    :usuario="row"
                                    :establecimientos="establecimientos"
                                    :oficinas="oficinas"></vt-panel-usuarios>
                            </template>
                            <template slot="detalle">
                                <vt-usuario-detalle :usuario="row"></vt-usuario-detalle>
                            </template> 
                            <template slot="edicion">
                                 <vt-usuario-formulario 
                                     :modelo="row" v-if="cargado"
                                     :configuracion="configuracion"
                                     :establecimientos="establecimientos" 
                                     :oficinas="oficinas"
                                     :grupos="grupos" 
                                     @vt-cambio-establecimiento="obtenerOficina"
                                     @vt-envio="enviaDatos"
                                     @vt-reseteo="reseteaFormulario"></vt-usuario-formulario>
                            </template> 
                            <template slot="borrado">
                                <vt-usuario-borrado></vt-usuario-borrado>
                            </template> 
                       </vt-panel>
	                </tr>
	            </tbody>
	        </table>
	    </div>
	</div>
    
</template>