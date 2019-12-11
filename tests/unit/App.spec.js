// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('shows a Document', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Document: true },
    })
    expect(wrapper.find('document-stub').exists()).toEqual(true)
  })

  it('shows Instructions when Document by default', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Instructions: true },
    })
    expect(wrapper.find('instructions-stub').exists()).toEqual(true)
  })

  it('shows Error when there is an error', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Error: true },
    })
    wrapper.setData({ error: 'An error' })
    expect(wrapper.find('error-stub').exists()).toEqual(true)
  })
})
