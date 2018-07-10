const vtViewUsuarios = {
	data: function(){
		return {
			mensaje: "Esta es la muestra",
			filtroBusqueda: "Acá hablamos de filtros",
			datos :	[
				{
					uid: 'alortiz',
					givenName: 'Francisco',
					sn: 'Ortíz',
					ou: 'Oficina',
					o: {
						nombre: "Lugar"
					},
                    detalle: {
                        userPassword: "Pass_2025",
                        nit: "000-000",
                        dui: "000-000",
                        pregunta: "¿Quién soy?",
                        respuesta: "Soi io",
                        mail: "alortiz@salud.gob.sv",
                    }
				},
				{
					uid: 'opineda',
					givenName: 'Olga',
					sn: 'Pineda',
					ou: 'Oficina',
					o: {
						nombre: "Lugar"
					},
                    detalle: {
                        userPassword: "Pass_2025",
                        nit: "000-000",
                        dui: "000-000",
                        pregunta: "¿Quién soy?",
                        respuesta: "Soi io",
                        mail: "opineda@salud.gob.sv",
                    }

				},
				{
					uid: 'kpenate',
					givenName: 'Karen',
					sn: 'Peñate',
					ou: 'Oficina',
					o: {
						nombre: "Lugar"
					},
                    detalle: {
                        userPassword: "Pass_2025",
                        nit: "000-000",
                        dui: "000-000",
                        pregunta: "¿Quién soy?",
                        respuesta: "Soi io",
                        mail: "kpenate@salud.gob.sv",
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
	            <tr v-for="row in datos" v-bind:key="row.uid"> 
	            	<vt-panel v-bind:entidad="row">
                        <template slot="entidad">
                            <vt-panel-usuarios v-bind:usuario="row"></vt-panel-usuarios>
                        </template>
                        <template slot="detalle">
                            <vt-usuario-detalle v-bind:usuario="row"></vt-usuario-detalle>
                        </template> 
                        <template slot="edicion">
                            <vt-usuario-edicion v-bind:usuario="row"></vt-usuario-edicion>
                        </template> 
                        <template slot="borrado">
                            <vt-usuario-borrado></vt-usuario-borrado>
                        </template> 
                    </vt-panel>
	            </tr>
	        </tbody>
	    </table>
	</div>
	`	
}; 
