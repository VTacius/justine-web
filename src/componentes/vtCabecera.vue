<template>
    <div class="lateral">
        <div class="logo">
            <router-link to="/"><img src="@/img/logo.png"></router-link>
        </div>
        <div class="menu">
            <ul>
                <li><router-link to="/usuarios"><i class="fas fa-user"></i><span>Usuarios</span></router-link></li>
                <li><router-link to="/grupos"><i class="fas fa-users"></i><span>Grupos</span></router-link></li>
                <li><router-link to="/equipos"><i class="fas fa-desktop"></i><span>Equipos</span></router-link></li>
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

<style lang="scss" scoped>
    $color-fondo: #313945;
    $color-fuente: #d2d2d2;
    $color-fuente-resaltado: #2a313c;
    
    img {
        max-width: 100%;
        height: auto;
        display: none;
    }

    .lateral {
        background-color: $color-fondo;
        color: $color-fuente;
        /** Será del alto de la página diponible */
        height: 100%;
        display: flex;
        /** Se dispondrán en varias columnas, sin intentar ubicarse en una línea */
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: stretch;
    }
    
    i.fas {
        margin-right: 0.3rem;
        margin-left: 0.4rem;
    } 
    
    span.texto {
        padding: 0.8rem;
        display: block;
        text-decoration: none;  

    } 
    
    span {
        display: none;
    }
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul a {
        color: $color-fuente;
        padding: 0.8rem;
        display: block;
        text-decoration: none;  
    }

    ul a:hover {
        background-color: $color-fuente-resaltado;
    }

    li {
        display: inline-block;
    }

    .toolbox {
        display: none;
        width: auto;
        position: fixed;
        background-color: $color-fondo;
        right:0;
    }
    
    .toolbox h2 {
        margin: 0.9rem 0.8rem 0.4rem 0.8rem;
    }

    .toolbox li {
        display: list-item;
    } 
    
    .medalla .texto:hover {
        background-color: $color-fuente-resaltado;
        cursor: pointer;
    }

    .medalla:hover .toolbox{
        /** TODO: ¿Debería cambiar el esquema para que este dentro de .text:hover  */
        display: block;
    }

    @media screen and (min-width: 34.375rem){
        img { 
            display: block;
        }
           
    }    
    
    @media screen and (min-width: 60rem){
        span {
            display: unset;
        }
    }    
    
    @media screen and (min-width: 80rem) {
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
