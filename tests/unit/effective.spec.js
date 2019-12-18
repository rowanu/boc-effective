import effective from '@/effective.js'

describe.only('policy.schema.json', () => {
  it('validates AdministratorAccess', async () => {
    const AdministratorAccess = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: '*' }],
    }
    const policy = effective(AdministratorAccess)
    expect(policy.isValid).toEqual(true)
  })

  it('invalidates a missing Statement', async () => {
    const MissingStatement = {
      Version: '2012-10-17',
    }
    const policy = effective(MissingStatement)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      "should have required property 'Statement'"
    )
  })
})
