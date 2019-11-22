<template>
    <div class="pantalla">
        <header>
            <vt-cabecera :usuario="usuario"></vt-cabecera>
        </header>
        <main>
            <router-view @logueo="logueo" @logout="logout"></router-view>
        </main>
    </div>
</template>

<script>
import vtCabecera from "./componentes/vtCabecera";
import { obtener, configurar, borrar} from "./utils/cookies";
export default {
    name: 'app', 
    components: { vtCabecera, obtener },
    data: function(){
        return {
            usuario: {}
        };
    },
    mounted: function(){
        let nombre = obtener('dUsuario') || 'Alexander Ortiz';
        let username = obtener('dUsername') || 'alortiz';
        /*let administrador = obtener('dAdministrador');*/
        let administrador = true;
        console.log('Estos son los datos al montar');
        this.usuario = {
            nombre, administrador, username
        }
        console.log(this.usuario);
    },
    methods: {
        logueo: function(valor){
            let nombre = valor.gecos;
            let username = 'alortiz';
            let administrador = valor.rol === 'administrador';
            
            this.usuario = {
                nombre, administrador, username
            }

            configurar('dUsuario', nombre);
            configurar('dUsername', username);
            configurar('dAdministrador', administrador);
            configurar('token', valor.token);
        },
        logout: function(valor){
            let nombre = '';
            let username = '';
            let administrador = false;
            
            this.usuario = {
                nombre, administrador, username
            }

            borrar('dUsuario');
            borrar('dUsername');
            borrar('dAdministrador');
            borrar('token');
        }
    }
}
</script>

<style>
    @import "../node_modules/normalize.css/normalize.css";
    @import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
    /*
     * La idea fue tomar idea de esto https://encycolorpedia.es/313945 
     */
    
    html {
        font-size: 100%;
    }
    
    body {
        color: #23282f;
        background-color: #d9dbdd;
        min-width: 400px;
        padding-left: 0 !important;
    } 
    .pantalla {
        letter-spacing: -0.31em; /* Webkit: collapse white-space between units */
        *letter-spacing: normal; /* reset IE < 8 */
        *word-spacing: -0.43em; /* IE < 8: collapse white-space between units */
        text-rendering: optimizespeed; /* Webkit: fixes text-rendering: optimizeLegibility */


        /* Use flexbox when possible to avoid `letter-spacing` side-effects. */
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
                flex-flow: row wrap;

        /* Prevents distributing space between rows */
        -webkit-align-content: flex-start;
            -ms-flex-line-pack: start;
                align-content: flex-start;

    }
    
    body, header, main, .pantalla {
        font-family: FreeSans, Arimo, "Droid Sans", Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        height: auto;
    }
    
    header,  
    main {
        display: block;
        box-sizing: border-box;
        width: 100%;
        letter-spacing: normal;
        word-spacing: normal;
        letter-spacing: normal;
        word-spacing: normal;
        text-rendering: auto;
    }
    
    header {
        position: fixed;
        z-index: 5;
    }

    main {
        margin-top: 3.50rem;
    }
    
    @media screen and (min-width: 80em) {
        header, main, .pantalla {
            height: 100%;
        }
        
        header {
            width: 12.5000%;
            *width: 12.4690%;
        }

        main {
            display: inline-block;
            *display: inline;
            width: 87.5000%;
            *width: 87.4690%;
            padding-top: 0.875rem;
            margin: 0rem;
            margin-left: 12.5000%;
            *margin-left: 12.4690%;
        }
    }
 </style>
