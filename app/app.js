/** Los componentes principales */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/** Componentes personalizados: Vistas */
import vtViewGrupos from './vistas/grupos.vue';
import vtViewUsuarios from './vistas/usuarios/main.vue';
import vtPrincipal from './vistas/principal.vue';
import vtViewPerfil from './vistas/perfil/main.vue';
import vtViewLogin from './vistas/login/login.vue';
import vtViewLogout from './vistas/login/logout.vue';

/** Componentes personalizados: componentes */
import vtMenu from './componentes/menu.vue';

/** La actual librería para manejar la autenticación */
import Autenticacion from './autenticacion/main.js';

const auth = new Autenticacion();

let redireccion = function(route){
    return {
        redirect: route.query.redirect
    };
};

/** Las rutas */
const routes = [
    { path: '/', component: vtPrincipal },
    { path: '/login', component: vtViewLogin, props: redireccion },
    { path: '/logout', component: vtViewLogout },
    { path: '/perfil', component: vtViewPerfil, meta: {requireAuth: true} },
    { path: '/grupos', component: vtViewGrupos, meta: {requireAuth: true} },
    { path: '/usuarios', component: vtViewUsuarios }
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

router.beforeEach(function(to, from, next){
    if (to.meta.requireAuth){
        if (!auth.isLogin()){
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            /** Estoy logueado, sigo mi camino */
            next();
        }
        /** No es necesario estar logueado, sigo mi camino */
        next();
    }
    next();
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
    components: { vtMenu }
}).$mount('#justine');