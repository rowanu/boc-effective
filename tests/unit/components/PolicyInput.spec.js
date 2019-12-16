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

  it('shows an error', async () => {
    const error = 'Oh noes'
    const wrapper = shallowMount(PolicyInput)
    wrapper.setData({ error })
    expect(wrapper.find('.error').text()).toEqual(error)
  })

  it('shows an error from child', async () => {
    const error = 'A JSON parsing error'
    const wrapper = shallowMount(PolicyInput)
    wrapper.find('jsoninput-stub').vm.$emit('error', error)
    await Vue.nextTick()
    expect(wrapper.find('.error').text()).toEqual(error)
  })
})
