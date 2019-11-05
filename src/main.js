import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;


//实现正向代理
// app.use('/api', httpProxyMiddleware({
//   target: 'http://localhost:3000',
//   changeOrigin: true
// }));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
