import effective from '@/effective.js'

describe('policy.schema.json', () => {
  it('validates AdministratorAccess', async () => {
    const AdministratorAccess = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: '*' }],
    }
    const policy = effective(AdministratorAccess)
    expect(policy.isValid).toEqual(true)
  })

  it('invalidates a missing Statement', async () => {
    const MissingStatement = {}
    const policy = effective(MissingStatement)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      "should have required property 'Statement'"
    )
  })

  it('invalidates an empty Statement', async () => {
    const EmptyStatement = {
      Statement: [],
    }
    const policy = effective(EmptyStatement)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      '.Statement should NOT have fewer than 1 items'
    )
  })

  it('invalidates a missing Effect', async () => {
    const EmptyEffect = {
      Statement: [{ Action: '*', Resource: '*' }],
    }
    const policy = effective(EmptyEffect)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      ".Statement[0] should have required property 'Effect'"
    )
  })

  it('invalidates a missing Action', async () => {
    const EmptyAction = {
      Statement: [{ Effect: 'Allow', Resource: '*' }],
    }
    const policy = effective(EmptyAction)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      ".Statement[0] should have required property 'Action'"
    )
  })

  it('invalidates a missing Resource', async () => {
    const EmptyResource = {
      Statement: [{ Effect: 'Allow', Action: '*' }],
    }
    const policy = effective(EmptyResource)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      ".Statement[0] should have required property 'Resource'"
    )
  })

  it('allows an array of Action', async () => {
    const ActionArray = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: ['a'], Resource: '*' }],
    }
    const policy = effective(ActionArray)
    expect(policy.isValid).toEqual(true)
  })

  it('allows an array of Resource', async () => {
    const ResourceArray = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: ['a'] }],
    }
    const policy = effective(ResourceArray)
    expect(policy.isValid).toEqual(true)
  })
})

describe('report', () => {
  it('contains a resource', async () => {
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: 'a' }],
    }
    const { report } = effective(policy)
    expect(report.resources[0].name).toEqual('a')
  })

  it('contains actions in a resource', async () => {
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: ['a'] }],
    }
    const { report } = effective(policy)
    expect(report.resources[0].actions).toEqual(['*'])
  })
})
