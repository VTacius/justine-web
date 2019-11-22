import Vue from 'vue'
import App from './App'
import router from "./router";
import { credenciales, peticion } from './utils/peticiones';

Vue.prototype.$peticion = peticion;
Vue.prototype.$credenciales = credenciales;

new Vue({
    render: h => h(App),
    router
}).$mount('#justine');