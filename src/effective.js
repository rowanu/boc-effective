const Ajv = require('ajv')
const ajv = new Ajv()

const schema = require('@/policy.schema.json')
const validate = ajv.compile(schema)

export default function(input) {
  const isValid = validate(input)
  return {
    // TODO: errors
    isValid,
    errors: validate.errors && validate.errors.map(e => e.message),
  }
}
