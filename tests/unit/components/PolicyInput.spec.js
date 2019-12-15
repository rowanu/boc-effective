// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import PolicyInput from '@/components/PolicyInput.vue'

describe('PolicyInput', () => {
  it('contains a JSONInput component', async () => {
    const wrapper = shallowMount(PolicyInput, {
      stubs: { JSONInput: true },
    })
    expect(wrapper.contains('jsoninput-stub')).toEqual(true)
  })
})
