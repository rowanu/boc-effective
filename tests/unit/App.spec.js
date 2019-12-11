import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('shows a Document', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Document: '<div id="document"></div>' },
    })
    expect(wrapper.find('#document').exists()).toEqual(true)
  })

  it('shows Instructions when Document is empty', async () => {
    const wrapper = shallowMount(App, {
      stubs: { Instructions: '<div id="instructions"></div>' },
    })
    // TODO: Vue.nextTick will? be required due to state change propagation
    expect(wrapper.find('#instructions').exists()).toEqual(true)
  })
})
