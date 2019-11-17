import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from './plugin'

Vue.config.productionTip = false;

import './components/comments/style/comment.scss'


//全局发布中心
Vue.prototype.$center = new Vue();

Vue.use(plugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
