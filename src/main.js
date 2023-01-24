import Vue from 'vue'
import App from './App.vue'
// vue-material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// vue-router
import VueRouter from 'vue-router'
import routes from '/src/router/routes.js'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes,
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')