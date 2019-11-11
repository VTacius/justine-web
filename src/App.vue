<template>
    <!-- TODO: Cuando dominés la idea de cancel en axios, el blackout debería aplicarse sólo a main:
    La idea es que podríamos cambiar de ruta, pero habría que precisamente cancelar todas las peticiones requeridas -->
    <div :class="{ 'pure-u-1': true, 'blackout-is-active': spinner}">
        <header class="pure-g">
            <vt-menu v-bind:datos="menu"></vt-menu>
        </header>
        <main class="pure-u-1"><!-- Esta es la aplicación raíz -->
            <vt-spinner v-bind:activar="spinner"></vt-spinner>
            <div class="pure-g">
              <!-- La aplicación -->
              <router-view @vt-cargado="controlSpinner"></router-view>
            </div>
        </main>
        <footer class="pure-u-1">
            <p>Este es un footer, en algún momento pondré un poco de contenido por aquí</p>
        </footer>
    </div>
</template>

<script>
import vtMenu from './componentes/menu';
export default {
    components: {vtMenu},
    data: function(){
        return {
            spinner: false,
            menu: {
                titulo: 'MINSAL',
                usuario: 'Francisco Alexander Rodríguez Ortíz'
            }
        }
    },
    methods: {
        controlSpinner: function(valor){
            this.spinner = valor;
        }
    },
}
</script>

<style>
    @import "../node_modules/purecss/build/base.css";
    @import "../node_modules/purecss/build/grids.css";
    @import "../node_modules/purecss/build/grids-responsive.css";
    @import "../node_modules/purecss/build/forms.css";
    @import "../node_modules/purecss/build/tables.css";
    @import "../node_modules/purecss/build/buttons.css";
    @import "../node_modules/pikaday/css/pikaday.css";
    /* Agrego los íconos, ahora en forma de fuentes */
    @import "../node_modules/font-awesome/css/font-awesome.css";
    /* Sobreescribo lo necesario */
    @import "app.css";
    /* Pues espero que más bien sea por acá */
    @import "./sass/app.scss";
</style>