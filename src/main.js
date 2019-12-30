import Vue from 'vue'
import App from '@/App.vue'
import Effective from '@/plugins/Effective.js'
import allActions from '@/actions.json'

Vue.use(Effective, { allActions })
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
