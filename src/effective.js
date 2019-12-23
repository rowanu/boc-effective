const Ajv = require('ajv')
const ajv = new Ajv()

const schema = require('@/policy.schema.json')
const validate = ajv.compile(schema)

const arrayify = value => {
  return Array.isArray(value) ? value : [value]
}
export default function(policy) {
  const isValid = validate(policy)
  let report = {}
  if (isValid) {
    const resources = []
    policy.Statement.forEach(s => {
      // FIXME: This variable naming is confusing
      const resource = arrayify(s.Resource)
      resource.forEach(r => {
        const actions = arrayify(s.Action)
        resources.push({ name: r, actions })
      })
    })
    // TODO: Sort, uniq
    report = { resources }
  }

  return {
    report,
    isValid,
    errors:
      validate.errors &&
      validate.errors.map(e => `${e.dataPath} ${e.message}`.trim()),
  }
}
