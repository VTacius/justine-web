Vue.component('vt-panel-usuarios', {
	name: 'vt-panel-usuarios',
	props: ['usuario'],
	data: function(){
		return {
			panel: 100
		}
	},
	methods: {
		mostrarPanel: function(panel){
			this.panel = panel;
			/* TODO: Al activar el panel, nos vamos a buscar la información sobre el usuario al backend */
		},
		verificarPanelActivo: function (panel){
			return panel == this.panel;
		},
		permisos: function(){
			return false;
		}
		
	},
	template: `
	<td>
		<!-- TODO: Una alerta iba aquí. Una alerta deberá haber aquí -->
		<div class="pure-g jt-fila-panel">
		    <div class="pure-u-1 pure-u-lg-8-24  pure-u-xl-6-24  jt-celda">
		        <i class="fa fa-user"></i>
		        <span class="texto">{{usuario.givenName}} {{usuario.sn}}</span>
		    </div>
		    <div class="pure-u-1 pure-u-lg-5-24  pure-u-xl-3-24  jt-celda">
		        <i class="fa fa-at"></i>
		        <span class="texto">{{usuario.uid}}</span>
		    </div>
		    <div class="pure-u-1 pure-u-lg-11-24 pure-u-xl-12-24 jt-celda">
		        <i class="fa fa-map-marker"></i>
		        <span class="texto">
		            <i>{{usuario.ou}}</i><span v-show="usuario.ou && usuario.o.nombre"> en </span> <strong>{{usuario.o.nombre}}</strong></span>
		    </div>
			<!-- TODO: Si pudieras hacer que los tres componentes de arriba fueran uno en realidad, para luego jugar entre ellos y en conjunto, jugar con vt-botonera, panel sería génerico -->
			<vt-botonera v-on:vt-activar-panel="mostrarPanel"></vt-botonera>
		</div>
		
		<!-- Acá empiezan los paneles bien bonitos para mostrar al usuario -->
		<div class="pure-g" v-if="verificarPanelActivo(1)">
			<!-- TODO: Acá va un slot -->
			<div class="pure-u-1"><h3>Este es el contenido para detalles del usuario</h3></div>
		</div>
		<div class="pure-g" v-if="verificarPanelActivo(2)">
			<!-- TODO: Acá va un slot -->
			<div class="pure-u-1"><h3>Este es el contenido para edición del usuario</h3></div>
		</div>
		<div class="pure-g" v-if="verificarPanelActivo(3)">
			<!-- TODO: Acá va un slot -->
			<div class="pure-u-1"><h3>Este es el contenido para borrar al usuario</h3></div>
		</div>
	</td>
	`
});
