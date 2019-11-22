import Vue from 'vue'
import App from './App'
import router from "./router";
import { peticion } from './utils/peticiones';

Vue.prototype.$peticion = peticion;

new Vue({
    render: h => h(App),
    router
}).$mount('#app')