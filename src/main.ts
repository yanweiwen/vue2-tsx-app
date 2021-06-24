import Vue from 'vue'
import App from './index'
import router from './router'
import store from './store'
import "vue-tsx-support/enable-check"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
