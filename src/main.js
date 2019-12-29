import Vue from 'vue'
import App from '@/App.vue'
import Effective from '@/plugins/Effective.js'

// This will only run a browser, not in tests
const url = process.env.VUE_APP_POLICIES_URL
// eslint-disable-next-line
console.log(`Fetching ${url}`)
fetch(url, { cors: 'no-cors' }).then(response => {
  // eslint-disable-next-line
  console.log(`Response from ${url}`)
  return response.text().then(content => {
    // eslint-disable-next-line
    console.log(`Parsing ${url}`)
    const { serviceMap } = JSON.parse(
      content.replace('app.PolicyEditorConfig=', '')
    )
    const allActions = []
    // eslint-disable-next-line
    console.log('Generating all actions')
    for (const service in serviceMap) {
      for (const action of serviceMap[service].Actions) {
        allActions.push(`${serviceMap[service].StringPrefix}:${action}`)
      }
    }
    // eslint-disable-next-line
    console.log(`Found ${allActions.length} actions`)
    Vue.use(Effective, { allActions })
    Vue.config.productionTip = false
    new Vue({
      render: h => h(App),
    }).$mount('#app')
  })
})
