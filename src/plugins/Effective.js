const Ajv = require('ajv')
const ajv = new Ajv()

const schema = require('@/policy.schema.json')
const validate = ajv.compile(schema)

const arrayify = value => {
  return Array.isArray(value) ? value : [value]
}
const effective = function(policy) {
  const isValid = validate(policy)
  let report = {}
  if (isValid) {
    const resourceSummary = []
    policy.Statement.forEach(statement => {
      const resourcesArray = arrayify(statement.Resource)
      resourcesArray.forEach(resource => {
        const actions = arrayify(statement.Action)
        resourceSummary.push({ name: resource, actions })
      })
    })
    // TODO: Sort, uniq resources
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
  install(Vue) {
    Vue.prototype.$effective = effective
  },
}
