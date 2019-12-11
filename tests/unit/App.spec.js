import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('shows a Document', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Document: true },
    })
    expect(wrapper.contains('document-stub')).toEqual(true)
  })

  it('shows Instructions when Document by default', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Instructions: true },
    })
    expect(wrapper.contains('instructions-stub')).toEqual(true)
  })

  // TODO: wrapper.find(ChildComponent).vm.$emit('custom')
  it('shows Error when there is an error', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Error: true },
    })
    expect(wrapper.contains('error-stub')).toEqual(false)
    wrapper.setData({ error: 'An error' })
    await Vue.nextTick()
    expect(wrapper.contains('error-stub')).toEqual(true)
  })

  it('shows Report when there is a report', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Report: true },
    })
    wrapper.setData({ report: { actions: ['a', 'b'] } })
    await Vue.nextTick()
    expect(wrapper.contains('report-stub')).toEqual(true)
    expect(wrapper.contains('instructions-stub')).toEqual(false)
  })
})
