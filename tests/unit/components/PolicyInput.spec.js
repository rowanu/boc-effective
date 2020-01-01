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

  it('shows an error if there is one', async () => {
    const wrapper = shallowMount(PolicyInput)
    expect(wrapper.find('.notification').exists()).toBe(false)
  })

  it('shows errors', async () => {
    const errors = ['Oh noes']
    const wrapper = shallowMount(PolicyInput)
    wrapper.setData({ errors })
    expect(wrapper.find('.notification').text()).toEqual(errors[0])
  })

  it('shows an error from child', async () => {
    const error = 'A JSON parsing error'
    const wrapper = shallowMount(PolicyInput)
    wrapper.find('jsoninput-stub').vm.$emit('error', error)
    await Vue.nextTick()
    expect(wrapper.find('.notification').text()).toEqual(error)
  })

  it('clears errors when valid input is emitted', async () => {
    const errors = ['It was invalid']
    const input = {
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Action: '*', Resource: '*' }],
    }
    const $effective = () => ({
      isValid: true,
    })
    const wrapper = shallowMount(PolicyInput, {
      mocks: { $effective },
    })
    wrapper.setData({ errors })
    wrapper.find('jsoninput-stub').vm.$emit('input', input)
    expect(wrapper.contains('.notification')).toEqual(false)
  })

  it('shows errors', async () => {
    const errors = ['Missing something in the policy']
    const wrapper = shallowMount(PolicyInput)
    wrapper.setData({ errors })
    expect(wrapper.find('.notification').text()).toEqual(errors[0])
  })

  it('emits a report', async () => {
    const wrapper = shallowMount(PolicyInput)
    // FIXME? Requires knowledge of policy format e.g. isValid
    wrapper.setData({ policy: { isValid: true, report: {} } })
    expect(wrapper.emitted().report[0]).toEqual([{}])
  })

  it('clears errors', async () => {
    const $effective = () => ({
      isValid: true,
    })
    const errors = ['Missing something in the policy']
    const wrapper = shallowMount(PolicyInput, {
      mocks: { $effective },
    })
    wrapper.setData({ errors })
    wrapper.vm.setInput(null)
    expect(wrapper.contains('.notification')).toEqual(false)
  })

  it('resets a report', async () => {
    const wrapper = shallowMount(PolicyInput)
    wrapper.vm.setInput(null)
    expect(wrapper.emitted().report[0]).toEqual([null])
  })
})
