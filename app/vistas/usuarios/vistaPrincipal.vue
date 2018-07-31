<script>

import vtPanel from './../../componentes/panel.vue';
import vtPanelUsuarios from './panel.vue';
import vtUsuarioDetalle from './detalle.vue';
import vtUsuarioFormulario from './formulario.vue';
import vtUsuarioBorrado from './borrado.vue';
import formularioUsuario from './../../mixins/formularioUsuario.js';

export default {
    name: 'vtPrincipalUsuarios',
    mixins: [ formularioUsuario ],
    components: { vtPanel, vtPanelUsuarios, vtUsuarioDetalle, vtUsuarioFormulario, vtUsuarioBorrado},
    data: function(){
        return {
            cargado: false,
            filtroBusqueda: '',
            datos :	[]
        };
    },
    created: function () {
        this.peticion('/usuarios', this, 'datos', 'listado', true);
    }
}
</script>
<template>
	<div class="pure-u-1">
		<div class="contenido jtbusqueda">
	        <!-- TODO: Una alerta iba aquí. Una alerta deberá haber aquí -->
	        <form class="pure-form jt-form jt-formulario-busqueda" novalidate>
	            <div class="jt-input-iconico">
	                <i class="fa fa-search jt-input-iconico-ico"></i>
	                <input class="pure-u-1 jt-input-iconico-in" type="text" v-model="filtroBusqueda">
	            </div>
	        </form>
	    </div>
	    <table class="pure-table pure-table-horizontal jt-tabla-contenido">
	        <tbody>
	            <tr v-for="row in datos" v-bind:key="row.uid"> 
	            	<vt-panel v-bind:entidad="row">
                        <template slot="entidad">
                            <vt-panel-usuarios v-bind:usuario="row"></vt-panel-usuarios>
                        </template>
                        <template slot="detalle">
                            <vt-usuario-detalle v-bind:usuario="row"></vt-usuario-detalle>
                        </template> 
                        <template slot="edicion">
                            <vt-usuario-formulario v-bind:usuario="row"></vt-usuario-formulario>
                        </template> 
                        <template slot="borrado">
                            <vt-usuario-borrado></vt-usuario-borrado>
                        </template> 
                    </vt-panel>
	            </tr>
	        </tbody>
	    </table>
	</div>
    
</template>