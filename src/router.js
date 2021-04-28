import Vue from 'vue';
import VueRouter from 'vue-router';

/** Componentes personalizados: Vistas */
import PrincipalUsuarios from '@/vistas/usuarios';
import PrincipalGrupos from '@/vistas/grupos';
import PrincipalEquipos from './vistas/equipos';
import Principal from '@/vistas/principal';
import Login from '@/vistas/login';
import Logout from '@/vistas/logout';
import Autenticacion from '@/utils/login';

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
        {path: '/usuarios', component: PrincipalUsuarios},
        {path: '/grupos', component: PrincipalGrupos, meta: {loginRequired: true}},
        {path: '/equipos', component: PrincipalEquipos},
        {path: '/login', component: Login, props: redireccion},
        {path: '/logout', component: Logout}
    ]
});

router.beforeEach(function(to, from, next){
    /** Activo el spinner */
    router.app.spinner = true;
    /** Verifico la autenticación */
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
