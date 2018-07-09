// 1. Define route components.

// 2. Define some routes
const routes = [
  { path: '/grupos', component: vtViewGrupos },
  { path: '/usuarios', component: vtViewUsuarios }
]

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
	router,
	el: "#justine",
	data: {
		menu: {
			titulo: "MINSAL",
			usuario: "Francisco Alexander Rodríguez Ortíz"
		}
	},
	components: { vtViewUsuarios }
}).$mount('#justine');


