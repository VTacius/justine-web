const vtViewUsuarios = {
	data: function(){
		return {
			mensaje: "Esta es la muestra",
			filtroBusqueda: "Esta prueba es más sencilla",
			datos :	[
				{
					uid: 'alortiz',
					givenName: 'Francisco',
					sn: 'Ortíz',
					ou: 'Oficina',
					o: {
						nombre: "Lugar"
					}
				},
				{
					uid: 'opineda',
					givenName: 'Olga',
					sn: 'Pineda',
					ou: 'Oficina',
					o: {
						nombre: "Lugar"
					}
				},
				{
					uid: 'kpenate',
					givenName: 'Karen',
					sn: 'Peñate',
					ou: 'Oficina',
					o: {
						nombre: "Lugar"
					}
				}

			]
		}
	},
	methods: {
		cambiarMensaje: function(){
			this.mensaje = "Este es el nuevo mensaje";
		}
	},
	template: `
	<div class="pure-u-1">
		<div class="contenido jt-busqueda">
	        <!-- TODO: Una alerta iba aquí. Una alerta deberá haber aquí -->
	        <form class="pure-form jt-form jt-formulario-busqueda" novalidate>
	            <div class="jt-input-iconico">
	                <i class="fa fa-search jt-input-iconico-ico"></i>
	                <input class="pure-u-1 jt-input-iconico-in" type="text" v-model="filtroBusqueda"></input>
	            </div>
	        </form>
	    </div>
	    <table class="pure-table pure-table-horizontal jt-tabla-contenido">
	        <tbody>
	            <tr v-for="row in datos" v-bind:key="row.uid" > 
	            	<vt-panel-usuarios v-bind:usuario="row"></vt-panel-usuarios>
	            </tr>
	        </tbody>
	    </table>
	</div>
	`	
}; 
