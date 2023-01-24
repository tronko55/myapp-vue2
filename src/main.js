import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from '/src/router/index.js'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterial)



const router = new VueRouter({
  mode: "history",
  routes,
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

