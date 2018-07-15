/** Los componentes principales */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/** Componentes personalizados: Vistas */
import vtViewGrupos from './vistas/grupos.vue';
import vtViewUsuarios from './vistas/usuarios/main.vue';
/** Componentes personalizados: componentes */
import vtMenu from './componentes/menu.vue';
import vtEntrada from './componentes/entrada.vue';

/** Las rutas */
const routes = [
    { path: '/grupos', component: vtViewGrupos },
    { path: '/usuarios', component: vtViewUsuarios }
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

new Vue({
    router,
    el: '#justine',
    data: {
        menu: {
            titulo: 'MINSAL',
            usuario: 'Francisco Alexander Rodríguez Ortíz'
        }
    },
    components: { vtMenu, vtEntrada }
}).$mount('#justine');