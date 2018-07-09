Vue.component('vt-menu', {
	data: function(){
		return {
			panel: 100
		}
	},
	props: ['datos'],
	methods: {
		muestra: function(panel){
			return this.panel == panel;
		},
		mostrar: function(panel){
			this.panel = panel;
		}
	},
	template: `
<div class="jt-menu">
    <div class="jt-menu-seccion-izquierda">{{datos.titulo}}</div> 
    <div class="jt-menu-seccion-central">
        <ul class="jt-menu-elemento">
            <li class="jt-menu-elemento-enlace" v-on:mouseover="mostrar(1)" v-on:mouseout="mostrar(100)">
                <a href="#"><span class="fa fa-user"></span><span class="texto">Usuarios</span></a>
                <ul class="jt-menu-elemento-subenlace" v-if="muestra(1)">
                    <li><router-link to="/usuarios">Listado</router-link></li>
                    <li>Creación</li>
                    <li>Borrado</li>
                </ul>
            </li>
            <li class="jt-menu-elemento-enlace" v-on:mouseover="mostrar(2)" v-on:mouseout="mostrar(100)">
                <a href="#"><span class="fa fa-users"></span><span class="texto">Grupos</span></a>
                <ul class="jt-menu-elemento-subenlace" v-if="muestra(2)">
                    <li><router-link to="/grupos">Listado</router-link></li>
                    <li>Creación</li>
                    <li>Borrado</li>
                </ul>
            </li>
            <li class="jt-menu-elemento-enlace" v-on:mouseover="mostrar(3)" v-on:mouseout="mostrar(100)">
				<a href="#"><span class="fa fa-desktop"></span><span class="texto">Equipos</span></a>
                <ul class="jt-menu-elemento-subenlace" v-if="muestra(3)">
                    <li>Listado</li>
                    <li>Creación</li>
                    <li>Borrado</li>
                </ul>
			</li>
        </ul>
    </div> 
    <div class="jt-menu-seccion-derecha" v-on:mouseover="mostrar(4)" v-on:mouseout="mostrar(100)">
        <span class="fa fa-edit"></span><span class="texto">Bienvenido, alortiz</span>
		<ul class="jt-menu-panel-usuario" v-if="muestra(4)">
        	<li>
            	<p>{{datos.usuario}}</p>
                <p>Editar Datos Personales</p>
                <p>Cerrar Sesión </p>
            </li>
        </ul>
    </div> 
</div>
	`
});
