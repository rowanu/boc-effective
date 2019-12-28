import Vue from 'vue'
import App from '@/App.vue'
import Effective from '@/plugins/Effective.js'

// Download here, as it will only be loaded in a browser
const url = process.env.VUE_APP_POLICIES_URL
console.log(`Fetching ${url}`)
fetch(url).then(response => {
  console.log(`Response from ${url}`)
  return response.text().then(content => {
    console.log(`Parsing ${url}`)
    const { serviceMap } = JSON.parse(
      content.replace('app.PolicyEditorConfig=', '')
    )
    const allActions = []
    console.log('Generating all actions')
    for (const service in serviceMap) {
      console.log(service)
      for (const action of serviceMap[service].Actions) {
        allActions.push(`${serviceMap[service].StringPrefix}:${action}`)
      }
    }
    console.log(`Found ${allActions.length} actions`)
    Vue.use(Effective, { allActions })
    Vue.config.productionTip = false
    new Vue({
      render: h => h(App),
    }).$mount('#app')
  })
})
