/** Los componentes principales */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import App from './App';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(VueCookie);

/** Componentes personalizados: Vistas */
import vtPrincipalGrupos from './vistas/grupos/index.vue';
import vtPrincipalEquipos from './vistas/equipos/index.vue';
import vtPrincipalUsuarios from './vistas/usuarios/index.vue';
import vtPrincipal from './vistas/principal.vue';
import vtViewLogin from './vistas/login/login.vue';
import vtViewLogout from './vistas/login/logout.vue';

/** Componentes personalizados: componentes */
import vtSpinner from './componentes/spinner.vue';

/** La actual librería para manejar la autenticación */
import Autenticacion from './autenticacion/main.js';

const auth = new Autenticacion();

let redireccion = function(route){
    return {
        redirect: route.query.redirect
    };
};

const peticion = axios.create({
    baseURL: 'https://api.github.com/'
});

Vue.prototype.$peticion = peticion;

/** Las rutas */
const routes = [
    { path: '/', component: vtPrincipal },
    { path: '/login', component: vtViewLogin, props: redireccion },
    { path: '/logout', component: vtViewLogout },
    { path: '/grupos', component: vtPrincipalGrupos, meta: {requireAuth: false} },
    { path: '/equipos', component: vtPrincipalEquipos},
    { path: '/usuarios', component: vtPrincipalUsuarios }
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

Vue.component('vt-spinner', vtSpinner);

new Vue({
    router,
    render: h => h(App),
}).$mount('#justine');
