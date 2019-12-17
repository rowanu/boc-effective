const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = require('@/policy.schema.json')

describe.only('policy.schema.json', () => {
  it('AdministratorAccess is valid', async () => {
    const AdministratorAccess = require('./AdministratorAcccess.policy.json')
    const validate = ajv.compile(schema)
    const valid = validate(AdministratorAccess)
    if (!valid) console.log(validate.errors)
    expect(validate(AdministratorAccess)).toEqual(true)
  })

  it('validates there is an Action', async () => {
    const Invalid = require('./InvalidNoAction.policy.json')
    const validate = ajv.compile(schema)
    const valid = validate(Invalid)
    // if (!valid) console.log(validate.errors)
    expect(valid).toEqual(false)
  })

  it('validates Actions are strings', async () => {
    const Invalid = require('./InvalidAction.policy.json')
    const validate = ajv.compile(schema)
    const valid = validate(Invalid)
    // if (!valid) console.log(validate.errors)
    expect(valid).toEqual(false)
  })
})
