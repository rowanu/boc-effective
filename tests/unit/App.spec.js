import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('shows a PolicyInput by default', async () => {
    const wrapper = shallowMount(App, {
      stubs: { PolicyInput: true },
    })
    expect(wrapper.contains('policyinput-stub')).toEqual(true)
  })

  it('shows Instructions by default', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Instructions: true },
    })
    expect(wrapper.contains('instructions-stub')).toEqual(true)
  })

  it('shows Report when there is a report', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Report: true },
    })
    wrapper.find('policyinput-stub').vm.$emit('report', {})
    await Vue.nextTick()
    expect(wrapper.contains('report-stub')).toEqual(true)
    expect(wrapper.contains('instructions-stub')).toEqual(false)
  })
})
