<script>
import vtBotonera from './botonera.vue';

export default {
	name: 'vt-panel',
	components: { vtBotonera },
	data: function(){
		return {
			panel: 0
		}
	},
	methods: {
		mostrarPanel: function(panel){
			this.panel = panel;
		},
		verificarPanelActivo: function (panel){
			return panel == this.panel;
		},
		permisos: function(){
            /* TODO: Los permisos son datos que se pasan desde el padre. En todo caso, no hay gran drama por almacenarse en local y que el usuario pueda modificarles: El backend devolverá error
             */
			return false;
		}
		
	}
}
</script>
<template>
	<td>
		<!-- TODO: Una alerta iba aquí. Una alerta deberá haber aquí.
                Considero que definitivamente debe haber una alerta (y mensajes) bien cerca de la atención del usuario, 
                aún considerando que esta aplicación acaba de cambiar mucho bastante debido a los slot
            -->
        <!-- TODO: ¿Debe la alerta ser un slot? -->
		<!-- TODO: Revisar este maquetado. Es evidente que esta mal -->
		<div class="pure-g jt-fila-panel">
		    <div class="pure-u-1 pure-u-lg-24-24 pure-u-xl-21-24">
                <slot name="entidad"></slot>
            </div>
		    <div class="pure-u-1 pure-u-lg-24-24 pure-u-xl-3-24 jt-celda jt-fila-panel-botonera">
			    <vt-botonera v-on:vt-activar-panel="mostrarPanel"></vt-botonera>
		    </div>
		</div>
        
		<!-- Acá empiezan los paneles bien bonitos para mostrar al usuario -->

		<div class="pure-g" v-if="verificarPanelActivo(1)">
			<slot name="detalle"></slot>
		</div>
		<div class="pure-g" v-if="verificarPanelActivo(2)">
			<slot name="edicion"></slot>
		</div>
		<div class="pure-g" v-if="verificarPanelActivo(3)">
			<slot name="borrado"></slot>
		</div>
	</td>
	
</template>