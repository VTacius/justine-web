/** Los componentes principales */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
Vue.use(VueRouter);
Vue.use(VueCookie);

/** Componentes personalizados: Vistas */
import vtPrincipalGrupos from './vistas/grupos/vistaPrincipal.vue';
import vtPrincipalUsuarios from './vistas/usuarios/vistaPrincipal.vue';
import vtCreacionUsuarios from './vistas/usuarios/vistaCreacion.vue';
import vtPrincipalEquipos from './vistas/equipos/vistaPrincipal.vue';
import vtPrincipal from './vistas/principal.vue';
import vtViewPerfil from './vistas/perfil/vistaPrincipal.vue';
import vtViewLogin from './vistas/login/login.vue';
import vtViewLogout from './vistas/login/logout.vue';

/** Componentes personalizados: componentes */
import vtMenu from './componentes/menu.vue';
import vtSpinner from './componentes/spinner.vue';

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
    { path: '/grupos', component: vtPrincipalGrupos, meta: {requireAuth: true} },
    { path: '/equipos', component: vtPrincipalEquipos},
    { path: '/usuarios', component: vtPrincipalUsuarios },
    { path: '/usuarios/nuevo', component: vtCreacionUsuarios }
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

router.beforeEach(function(to, from, next){
    /** Activo el spinner */
    router.app.spinner = true;
    /** Verifico la autenticación */
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
        spinner: false,
        menu: {
            titulo: 'MINSAL',
            usuario: 'Francisco Alexander Rodríguez Ortíz'
        }
    },
    methods: {
        controlSpinner: function(valor){
            this.spinner = valor;
        }
    },
    components: { vtMenu, vtSpinner }
}).$mount('#justine');
