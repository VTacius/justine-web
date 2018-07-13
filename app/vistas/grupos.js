const vtViewGrupos = {
	data: function(){
		return {
			mensaje: "Grupos: Esta es la muestra"
		}
	},
	methods: {
		cambiarMensaje: function(){
			this.mensaje = "Grupos: Este es el nuevo mensaje";
		}
	},
	template: `
	<div class="pure-u-1">
    	<div class="contenido">
			<p>Este es el contenido nuevo para grupos</p>
			<h2 v-on:mouseover="cambiarMensaje(1)">{{mensaje}}</h2>
			<input v-model="mensaje">
        	<p>Contenido para usuarios. El gran panel estará en este lugar.
				Contenido de prueba para la parte del medio.
				Contenido de prueba para la parte del medio.
				Contenido de prueba para la parte del medio.
				Contenido de prueba para la parte del medio.
				En realidad, debería considerar buscar más contenido para revisar longitud</p>
    	</div>
	</div>
	`	
}; 