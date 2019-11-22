<template>
    <div class="lateral">
        <div class="logo">
            <img src="@/img/logo.png">
        </div>
        <div class="menu">
            <ul>
                <li><router-link to="/usuarios"><i class="fas fa-user"></i>Usuarios</router-link></li>
                <li><router-link to="/grupos"><i class="fas fa-users"></i>Grupos</router-link></li>
                <li><router-link to="/computadoras"><i class="fas fa-desktop"></i>Equipos</router-link></li>
            </ul>
        </div>
        <div class="administrador" v-if="usuario.administrador">
            <ul>
                <li><router-link to="/usuarios/crear"><span>Crear usuario<i class="fas fa-user-plus"></i></span></router-link></li>
            </ul>
        </div> 
        <div class="medalla" v-if="estaLogueado">
            <span class="texto">Usuario<i class="fas fa-tools"></i></span>
            <div class="toolbox">
                <h2>{{usuario.nombre}}</h2>
                <ul>
                    <li><router-link :to="{name: 'UsuarioEdicion', params: {username: usuario.username}}"><i class="fas fa-user"></i>Editar Datos Personales</router-link></li>
                    <li><router-link to="/grupos"><i class="fas fa-users"></i>Cambiar Contraseña</router-link></li>
                    <li><router-link to="/logout"><i class="fas fa-desktop"></i>Cerrar Sessión</router-link></li>
                </ul>
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
    name: 'vt-cabecera',
    props: {
        usuario: Object
    },
    computed: {
        estaLogueado: function(){
            return 'username' in this.usuario && this.usuario.username !== '';
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 100%;
        height: auto;
    }

    .lateral {
        /** Será del alto de la página diponible */
        background-color: #313945;
        color: #d2d2d2;
        height: 100%;
        display: flex;
        /** Se dispondrán en varias columnas, sin intentar ubicarse en una línea */
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: stretch;
    }
    i.fas {
        margin-right: 0.3em;
        margin-left: 0.4em;
    } 
    span.texto {
        padding: 0.8em;
        display: block;
        text-decoration: none;  

    } 

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul a {
        color: #d2d2d2;
        padding: 0.8em;
        display: block;
        text-decoration: none;  
    }

    ul a:hover {
        background-color:#2a313c;
    }

    li {
        display: inline-block;
    }

    .toolbox {
        display: none;
        width: auto;
        position: absolute;
        background-color: #313945;
        right:0;
    }
    
    .toolbox h2 {
        margin: 0.9em 0.8em 0.4em 0.8em;
    }

    .toolbox li {
        display: list-item;
    } 
    
    .medalla .texto:hover {
        background-color:#2a313c;
        cursor: pointer;
    }

    .medalla:hover .toolbox{
        /** TODO: ¿Debería cambiar el esquema para que este dentro de .text:hover  */
        display: block;
    }
    
    @media screen and (min-width: 80em) {
        .lateral {
            flex-flow: column wrap;
        }
        
        .menu {
            flex-grow: 1;
        }
        
        li {
            display: unset;
        }

        .toolbox{
            bottom: 0;
            left: 12.50%;
            right: unset;
        }
    
    }
</style>