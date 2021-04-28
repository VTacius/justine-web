<script>
export default {
    name: 'vt-menu',
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
	}
}
</script>
<template> <div class="jt-menu">
        <div class="jt-menu-seccion-izquierda"><router-link to="/">{{datos.titulo}}</router-link></div> 
        <div class="jt-menu-seccion-central">
            <ul class="jt-menu-elemento">
                <li class="jt-menu-elemento-enlace">
                    <a href="#"><span class="fa fa-user"></span><router-link class="texto" to="/usuarios">Usuarios</router-link></a>
                </li>
                <li class="jt-menu-elemento-enlace">
                    <a href="#"><span class="fa fa-users"></span><router-link class="texto" to="/grupos">Grupos</router-link></a>
                </li>
                <li class="jt-menu-elemento-enlace">
    				<a href="#"><span class="fa fa-desktop"></span><router-link class="texto" to="/equipos">Equipos</router-link></a>
    			</li>
            </ul>
        </div> 
        <div class="jt-menu-seccion-derecha" v-on:mouseover="mostrar(4)" v-on:mouseout="mostrar(100)">
            <span class="fa fa-edit"></span><span class="texto">Bienvenido, alortiz</span>
    		<ul class="jt-menu-panel-usuario" v-if="muestra(4)">
            	<li>
                	<p>{{datos.usuario}}</p>
                    <p><router-link to="/perfil">Datos Personales</router-link></p>
                    <p><router-link to="/logout">Cerrar Sesión </router-link></p>
                </li>
            </ul>
        </div> 
    </div>
    
</template>