import _ from 'lodash'
import Ajv from 'ajv'
const schema = require('@/policy.schema.json')

const ajv = new Ajv()
const validate = ajv.compile(schema)

const arrayify = value => {
  return Array.isArray(value) ? value : [value]
}

const expand = (sourceActions, allActions) => {
  // TODO: All actions should be toLowerCase()
  let actions = []
  sourceActions.forEach(s => {
    if (s.includes('*')) {
      const matchedActions = allActions.filter(a =>
        a.match(new RegExp(`^${s}`))
      )
      actions = actions.concat(matchedActions)
      if (matchedActions.length < 1) {
        actions.push(s)
      }
    } else {
      actions.push(s)
    }
  })
  return _.uniq(actions).sort()
}

const effective = function(policy, allActions = []) {
  const isValid = validate(policy)
  let report = {}
  if (isValid) {
    const resourceSummary = []
    policy.Statement.forEach(statement => {
      const resourcesArray = arrayify(statement.Resource)
      resourcesArray.forEach(resource => {
        const actions = arrayify(statement.Action)
        const expandedActions = expand(actions, allActions)
        resourceSummary.push({ name: resource, actions: expandedActions })
      })
    })
    report = { resources: resourceSummary }
  }

  return {
    report,
    isValid,
    errors:
      validate.errors &&
      validate.errors.map(e => `${e.dataPath} ${e.message}`.trim()),
  }
}

export default {
  install(Vue, options = {}) {
    const allActions = options.allActions || []
    Vue.prototype.$effective = policy => effective(policy, allActions)
  },
}
