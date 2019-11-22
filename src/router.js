import Vue from 'vue';
import VueRouter from 'vue-router'

import Login from "@/vistas/login";
import Logout from "@/vistas/logout";
import Autenticacion from "@/utils/login";
import VistaGrupos from '@/vistas/grupos/index';
import VistaEquipos from '@/vistas/equipos/index';
import VistaUsuarios from '@/vistas/usuarios/index';
import UsuarioEdicion from '@/vistas/usuarios/Edicion';
import Principal from '@/vistas/principal';

Vue.use(VueRouter);

let redireccion = function(route){
    return {
        redireccion: route.query.redireccion
    };
};


const auth = new Autenticacion();
const router = new VueRouter({
    routes: [
        {path: '/', component: Principal},
        {path: '/grupos', component: VistaGrupos, meta: {loginRequired: true}},
        {path: '/equipos', component: VistaEquipos, meta: {loginRequired: true}},
        {path: '/usuarios', component: VistaUsuarios},
        {path: '/usuarios/:username/edicion', component: UsuarioEdicion, meta: {loginRequired: true}, props: true, name: 'UsuarioEdicion'},
        {path: '/login', component: Login, props: redireccion},
        {path: '/logout', component: Logout}
    ]
});

router.beforeEach(function(to, from, next) {
    let requerido = typeof(to.meta.loginRequired) === 'undefined' ? false : to.meta.loginRequired;  
    if(requerido && !auth.isLogin()) {
        next({
            path: '/login',
            query: { redireccion: to.fullPath }
        });
    } else {
        next();
    }
});

export default router;  