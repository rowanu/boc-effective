import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import PolicyInput from '@/components/PolicyInput.vue'

describe('PolicyInput', () => {
  it('contains a JSONInput component', async () => {
    const wrapper = shallowMount(PolicyInput, {
      stubs: { JSONInput: true },
    })
    expect(wrapper.contains('jsoninput-stub')).toEqual(true)
  })

  it('only shows an error if there is one', async () => {
    const wrapper = shallowMount(PolicyInput)
    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('shows errors', async () => {
    const errors = ['Oh noes']
    const wrapper = shallowMount(PolicyInput)
    wrapper.setData({ errors })
    expect(wrapper.find('.error').text()).toEqual(errors[0])
  })

  it('shows an error from child', async () => {
    const error = 'A JSON parsing error'
    const wrapper = shallowMount(PolicyInput)
    wrapper.find('jsoninput-stub').vm.$emit('error', error)
    await Vue.nextTick()
    expect(wrapper.find('.error').text()).toEqual(error)
  })

  it('clear an error when valid input is emitted', async () => {
    const errors = ['Oh noes']
    const input = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: '*' }],
    }
    const wrapper = shallowMount(PolicyInput)
    wrapper.setData({ errors })
    wrapper.find('jsoninput-stub').vm.$emit('input', input)
    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('shows a policy error', async () => {
    const errors = ['Oh noes']
    const input = {
      Version: '2012-10-17',
    }
    const wrapper = shallowMount(PolicyInput)
    wrapper.setData({ errors })
    wrapper.find('jsoninput-stub').vm.$emit('input', input)
    expect(wrapper.find('.error').text()).toEqual(
      "should have required property 'Statement'"
    )
  })
})
