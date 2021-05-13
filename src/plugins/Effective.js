import _ from 'lodash'
import Ajv from 'ajv'
const schema = require('@/policy.schema.json')

const ajv = new Ajv()
const validate = ajv.compile(schema)

const arrayify = value => {
  return Array.isArray(value) ? value : [value]
}

const expand = (sourceActions, allActions) => {
  let actions = []
  sourceActions.forEach(s => {
    if (s.includes('*')) {
      const pattern = s.replace(/\*/g, '.*')
      const matchedActions = allActions.filter(
        a => !a.search(new RegExp(`^${pattern}$`, 'i'))
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

const invert = (sourceActions, allActions) => {
  let actions = []
  sourceActions.forEach(s => {
    if (s.includes('*')) {
      const pattern = s.replace(/\*/g, '.*')
      const matchedActions = allActions.filter(
        a => !a.match(new RegExp(`^${pattern}$`, 'i'))
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

// TODO: _.uniq()
const addActions = (a, b) => a.concat(b).sort()

const removeActions = (a, b) => a.filter(x => !_.includes(b, x))

const effective = function(policy, allActions = []) {
  const isValid = validate(policy)
  let report = {}
  if (isValid) {
    const resourceSummary = []
    const resources = {}
    policy.Statement.forEach(statement => {
      const resourcesArray = arrayify(statement.Resource)
      resourcesArray.forEach(resource => {
        let results
        if (statement.Action) {
          const actions = arrayify(statement.Action)
          results = expand(actions, allActions)
        }
        if (statement.NotAction) {
          const notActions = arrayify(statement.NotAction)
          results = invert(notActions, allActions)
        }
        if (resources[resource]) {
          if (statement.Effect === 'Allow') {
            resources[resource] = addActions(resources[resource], results)
          }
          if (statement.Effect === 'Deny') {
            resources[resource] = removeActions(resources[resource], results)
          }
        } else {
          resources[resource] = results
        }
      })
    })
    for (const resource in resources) {
      resourceSummary.push({ name: resource, actions: resources[resource] })
    }
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
