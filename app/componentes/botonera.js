Vue.component('vt-botonera', {
	template: `
	<div class="pure-g">
	    <div class="pure-u-1-3 pure-u-md-1-3">
	        <button class="button-success pure-button izquierda" v-on:click="$emit('vt-activar-panel', 1)"><i class="fa fa-info-circle"></i></button>
	    </div>
	    <div class="pure-u-1-3 pure-u-md-1-3">
			<!-- TODO: El disabled de acuerdo a permisos lo vas a hacer de otra forma -->
	        <button class="button-success pure-button centro" v-on:click="$emit('vt-activar-panel', 2)"><i class="fa fa-edit"></i></button>
	    </div>
	    <div class="pure-u-1-3 pure-u-md-1-3">
	        <button class="button-error pure-button derecha" v-on:click="$emit('vt-activar-panel', 3)"><i class="fa fa-trash"></i></button>
	    </div>
	</div>
    `
});
