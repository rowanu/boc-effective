import Vue from 'vue'
import App from '@/App.vue'
import Effective from '@/plugins/Effective.js'

Vue.use(Effective)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
