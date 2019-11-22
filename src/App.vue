<template>
    <div class="pure-g pantalla">
        <header class="pure-u-1 pure-u-xl-1-8">
            <vt-cabecera :usuario="usuario"></vt-cabecera>
        </header>
        <main class="pure-u-2 pure-u-xl-7-8">
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
        let nombre = obtener('dUsuario') || '';
        let username = obtener('dUsername') || '';
        let administrador = obtener('dAdministrador');
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
    @import "../node_modules/purecss/build/base.css";
    @import "../node_modules/purecss/build/grids.css";
    @import "../node_modules/purecss/build/grids-responsive.css";
    @import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
    /*
     * La idea fue tomar idea de esto https://encycolorpedia.es/313945 
     */
    body {
        color: #23282f;
        background-color: #d9dbdd;
    } 
    
    body, header, main, .pantalla {
        box-sizing: border-box;
        height: auto;
    }
    
    main {
        font-size: 0.96em;
        padding-top: 0.2em;
        padding-left: 0.2em;
        max-height: 100%;
        overflow-y: scroll;
    }
    
    @media screen and (min-width: 80em) {
        header, main, .pantalla {
            height: 100%;
        }
        
        main {
            padding-top: 0;
        }

    }
 </style>