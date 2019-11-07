import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

//全局发布中心
Vue.prototype.$center = new Vue();



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
