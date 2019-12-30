const fetch = require('node-fetch')
const fs = require('fs')

const url = 'https://awspolicygen.s3.amazonaws.com/js/policies.js'
const filename = 'src/actions.json'

// eslint-disable-next-line
console.log(`Fetching ${url}`)
fetch(url, { mode: 'no-cors' })
  .then(response => response.text())
  .then(content => {
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
    console.log(`Writing ${allActions.length} actions to ${filename}`)
    fs.writeFileSync(filename, JSON.stringify(allActions))
  })
