Vue.component('vt-panel-usuarios', {
	props: ['usuario'],
	template: `
    <div class="pure-g">
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
	        <span class="texto"><i>{{usuario.ou}}</i><span v-show="usuario.ou && usuario.o.nombre"> en </span> <strong>{{usuario.o.nombre}}</strong></span>
	    </div>
	</div>
	`
});
