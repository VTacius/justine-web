<template> 
    <div class="jt-menu">
        <div class="jt-menu-seccion-izquierda"><router-link to="/">{{datos.titulo}}</router-link></div> 
        <div class="jt-menu-seccion-central">
            <ul class="jt-menu-elemento">
                <li class="jt-menu-elemento-enlace" v-on:mouseover="mostrar(1)" v-on:mouseout="mostrar(100)">
                    <router-link to="/usuarios"><span class="fa fa-user"></span><span class="texto">Usuarios</span></router-link>
                </li>
                <li class="jt-menu-elemento-enlace" v-on:mouseover="mostrar(2)" v-on:mouseout="mostrar(100)">
                    <router-link to="/grupos"><span class="fa fa-users"></span><span class="texto">Grupos</span></router-link>
                </li>
                <li class="jt-menu-elemento-enlace" v-on:mouseover="mostrar(3)" v-on:mouseout="mostrar(100)">
    				<router-link to="/equipos"><span class="fa fa-desktop"></span><span class="texto">Equipos</span></router-link>
    			</li>
            </ul>
        </div> 
        <div class="jt-menu-seccion-derecha" v-on:mouseover="mostrar(4)" v-on:mouseout="mostrar(100)">
            <span class="fa fa-edit"></span><span class="texto">Bienvenido, alortiz</span>
        </div> 
    </div>
    
</template>
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
<style lang="scss" scoped>
$color-fondo:#f2f2f2;
$color-borde: #cbcbcb; 
$color-fuente: #333;
$color-fuente-legible: #565d64;
$color-fondo-destacado: $color-borde;
/* Los siguientes estilos con comunes a todos */

.jt-menu {
    flex-flow: row wrap;
    display: flex;
    align-content: flex-start;
    /* Acá empiezo el trabajo propio*/
    /* Este lo agrego como propio pero temo en realidad por su comportamiento */
    width: 100%;
    /* Color que nav va a tener */
    background-color: $color-fondo;
    box-shadow: 0em 0.1em 1em 0.1em $color-borde;
    box-sizing: border-box;
    /* Nos ponemos serios con el diseño. El menú fijo es un éxito desde donde se le mire */
    position: fixed;
    /* Aseguramos que el menu este sobre todo el demás contenidos, con lo cual lo oculta */
    z-index: 10;
}

.jt-menu-seccion-izquierda,
.jt-menu-seccion-central,
.jt-menu-seccion-derecha {
    /* Este así lo específica pure-css para los cajones a los que se le configura tamaños */
    display: inline-block;
    letter-spacing: normal;
    word-spacing: normal;
    zoom: 1;
    font-family: sans-serif;
    color: $color-fuente-legible;
    align-items: center;
}

.jt-menu-elemento {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

/* Define los li de cada enlace */
.jt-menu-elemento-enlace {
    list-style: none;
    float: left;
    padding-top: 0.25em;
    padding-bottom: 0.4em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    cursor: pointer;
    /* Un pequeño delay en el cambio de fondo y no sé, es que se mira como más bonito  */
    transition: 0.3s;
}

.jt-menu-seccion-central a {
    text-decoration: none;
    color: inherit;
    /* Así la selección ocurre en todo la cajita */
    display: block;
}


/**
 * Acá empiezo el tamaño por defecto 
 * */

.jt-menu-seccion-izquierda {
    width: 100%;
    text-align: center;
    padding-top: 0.5em;
}

.jt-menu-seccion-izquierda a{
    text-decoration: none;
    color: inherit;
}

.jt-menu-seccion-izquierda a:hover,
.jt-menu-seccion-izquierda a.hover{
    color: $color-fuente;
}

.jt-menu-seccion-central {
    width: 69.9%;
}

.jt-menu-seccion-derecha {
    width: 29.9%;
    text-align: end;
    padding-right: 1em;
    /* Para que parezca el enlace que no es */
    cursor: pointer;
    /* Para darle un delay bien bonito, otra onda */
    transition: 0.3s;
}

.jt-menu-seccion-derecha {
    box-sizing: border-box;
}

.jt-menu-seccion-central .texto,
.jt-menu-seccion-derecha .texto {
    /* Oculto el texto y me ahorro todo ese espacio */
    display: none;
}


@media (min-width: 36.26em) {
    .jt-menu {
        align-items: flex-end;
    }

    .jt-menu-seccion-izquierda{
        line-height: 2.8em;
    }

    .jt-menu-seccion-central,
    .jt-menu-seccion-derecha {
        line-height: 3.375em;
        
    }
    /* Es que el texto tiene aproximadamente este padding-bottom bien raro */
    .jt-menu .fa {
        padding-bottom: 0.25em;
    }
    
    .jt-menu-seccion-izquierda,
    .jt-menu-seccion-central,
    .jt-menu-seccion-derecha {
        box-sizing: border-box;
        padding: 0;
    }
    .jt-menu-seccion-izquierda {
        font-size: 1.2em;
        padding-left: 1em;
        width: 32.5%;
        text-align: left;
    }
    
    .jt-menu-seccion-central {
        width: 49%;
    }
    
    .jt-menu-seccion-derecha {
        padding-right: 1em;
        text-align: end;
        width: 18.5%;
    }
    
    .jt-menu-elemento-enlace {
        padding-top: 0em;
        padding-bottom: 0em;
        padding-left: 1em;
        padding-right: 1em;
    }

    
}

@media (min-width: 49.625em) {

    .jt-menu-seccion-central .texto {
        /* Oculto el texto y me ahorro todo ese espacio */
        display: initial;
    }

}

@media (min-width: 60em) {
    
    .jt-menu-seccion-derecha .texto {
        /* Oculto el texto y me ahorro todo ese espacio */
        display: initial;
    }

}

.jt-menu-seccion-derecha:hover,
.jt-menu-seccion-derecha.hover,
.jt-menu-elemento-enlace:hover, 
.jt-menu-elemento-enlace.hover {
    color: inherit;
    display: block;
    background-color: $color-fondo-destacado;
    color: $color-fuente;
}
</style>