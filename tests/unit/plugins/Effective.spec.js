import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import Effective from '@/plugins/Effective.js'

const pluginWrapper = (options = {}) => {
  const localVue = createLocalVue()
  localVue.use(Effective, options)
  return shallowMount(App, {
    localVue,
  })
}

describe('Effective', () => {
  it('loads an instance method', async () => {
    const wrapper = pluginWrapper()
    expect(typeof wrapper.vm.$effective).toEqual('function')
  })

  it('validates AdministratorAccess', async () => {
    const wrapper = pluginWrapper()
    const AdministratorAccess = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: '*' }],
    }
    const policy = wrapper.vm.$effective(AdministratorAccess)
    expect(policy.isValid).toEqual(true)
  })

  it('invalidates a missing Statement', async () => {
    const wrapper = pluginWrapper()
    const MissingStatement = {}
    const policy = wrapper.vm.$effective(MissingStatement)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      "should have required property 'Statement'"
    )
  })

  it('invalidates an empty Statement', async () => {
    const wrapper = pluginWrapper()
    const EmptyStatement = {
      Statement: [],
    }
    const policy = wrapper.vm.$effective(EmptyStatement)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      '.Statement should NOT have fewer than 1 items'
    )
  })

  it('invalidates a missing Effect', async () => {
    const wrapper = pluginWrapper()
    const EmptyEffect = {
      Statement: [{ Action: '*', Resource: '*' }],
    }
    const policy = wrapper.vm.$effective(EmptyEffect)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      ".Statement[0] should have required property 'Effect'"
    )
  })

  it('invalidates a missing Action', async () => {
    const wrapper = pluginWrapper()
    const EmptyAction = {
      Statement: [{ Effect: 'Allow', Resource: '*' }],
    }
    const policy = wrapper.vm.$effective(EmptyAction)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      ".Statement[0] should have required property '.Action'"
    )
  })

  it('invalidates a missing Resource', async () => {
    const wrapper = pluginWrapper()
    const EmptyResource = {
      Statement: [{ Effect: 'Allow', Action: '*' }],
    }
    const policy = wrapper.vm.$effective(EmptyResource)
    expect(policy.isValid).toEqual(false)
    expect(policy.errors[0]).toEqual(
      ".Statement[0] should have required property 'Resource'"
    )
  })

  it('allows an array of Action', async () => {
    const wrapper = pluginWrapper()
    const ActionArray = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: ['a'], Resource: '*' }],
    }
    const policy = wrapper.vm.$effective(ActionArray)
    expect(policy.isValid).toEqual(true)
  })

  it('allows an array of Resource', async () => {
    const wrapper = pluginWrapper()
    const ResourceArray = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: ['a'] }],
    }
    const policy = wrapper.vm.$effective(ResourceArray)
    expect(policy.isValid).toEqual(true)
  })

  it('validates NotAction', async () => {
    const wrapper = pluginWrapper()
    const NotAction = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'DenyAllUsersNotUsingMFA',
          Effect: 'Deny',
          NotAction: 'iam:*',
          Resource: '*',
          Condition: {
            BoolIfExists: { 'aws:MultiFactorAuthPresent': 'false' },
          },
        },
      ],
    }
    const policy = wrapper.vm.$effective(NotAction)
    expect(policy.isValid).toEqual(true)
  })

  it('allows an array of NotAction', async () => {
    const wrapper = pluginWrapper()
    const NotActionArray = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', NotAction: ['*'], Resource: 'a' }],
    }
    const policy = wrapper.vm.$effective(NotActionArray)
    expect(policy.isValid).toEqual(true)
  })
})

describe('report', () => {
  it('contains a resource', async () => {
    const wrapper = pluginWrapper()
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: 'a' }],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].name).toEqual('a')
  })

  it('contains actions in a resource', async () => {
    const wrapper = pluginWrapper()
    const policy = {
      Version: '2012-10-17',
      Statement: [
        { Effect: 'Allow', Action: 'service:action', Resource: ['a'] },
      ],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual(['service:action'])
  })

  it('expands an Action with * in a resource', async () => {
    const wrapper = pluginWrapper({
      allActions: [
        'notservice:a',
        's3:AbortMultipartUpload',
        's3:BypassGovernanceRetention',
        's3:CreateAccessPoint',
        's3:GetAccessPoint',
        's3:GetBucketAcl',
        'service:a',
        'service:b',
        'service:c',
        'other',
      ],
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: 's3:G*', Resource: ['a'] }],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual([
      's3:GetAccessPoint',
      's3:GetBucketAcl',
    ])
  })

  it('is case-insensitive', async () => {
    const wrapper = pluginWrapper({
      allActions: [
        's3:GetAccelerateConfiguration',
        's3:GetAccessPoint',
        's3:GetAccessPointPolicy',
      ],
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: 's3:get*', Resource: ['a'] }],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual([
      's3:GetAccelerateConfiguration',
      's3:GetAccessPoint',
      's3:GetAccessPointPolicy',
    ])
  })

  it('returns unrecognised expansions unchanged', async () => {
    const wrapper = pluginWrapper({
      allActions: ['service:a', 'service:b', 'service:c', 'other'],
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: 'unknown:*', Resource: ['a'] }],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual(['unknown:*'])
  })

  it('does not include duplicates', async () => {
    const wrapper = pluginWrapper({
      allActions: ['service:a', 'service:b', 'service:c', 'other'],
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['service:a', 'service:*'],
          Resource: ['a'],
        },
      ],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual([
      'service:a',
      'service:b',
      'service:c',
    ])
  })

  it('expands a NotAction with * in a resource', async () => {
    const wrapper = pluginWrapper({
      allActions: [
        'notservice:a',
        'service:a',
        'service:b',
        'service:c',
        'other',
      ],
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', NotAction: 'service:*', Resource: ['a'] }],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual(['notservice:a', 'other'])
  })

  it('combines actions on a resource', async () => {
    const allActions = [
      'notservice:a',
      'other',
      'service:a',
      'service:b',
      'service:c',
    ]
    const wrapper = pluginWrapper({
      allActions,
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [
        { Effect: 'Allow', NotAction: 'service:*', Resource: ['a'] },
        { Effect: 'Allow', Action: 'service:*', Resource: ['a'] },
      ],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual(allActions)
  })

  it('removes denied actions on a resource', async () => {
    const allActions = [
      'notservice:a',
      'other',
      'service:a',
      'service:b',
      'service:c',
    ]
    const wrapper = pluginWrapper({
      allActions,
    })
    const policy = {
      Version: '2012-10-17',
      Statement: [
        { Effect: 'Allow', Action: '*', Resource: ['a'] },
        { Effect: 'Deny', Action: 'service:*', Resource: ['a'] },
      ],
    }
    const { report } = wrapper.vm.$effective(policy)
    expect(report.resources[0].actions).toEqual(['notservice:a', 'other'])
  })
})
