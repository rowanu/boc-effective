import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import JSONInput from '@/components/JSONInput.vue'

// https://devdocs.io/javascript/errors/json_bad_parse

describe('JSONInput', () => {
  it('flags invalid JSON', async () => {
    const wrapper = shallowMount(JSONInput)
    wrapper.setData({ input: 'OHAI' })
    expect(wrapper.vm.isValid).toEqual(false)
  })

  it('allows valid JSON', async () => {
    const wrapper = shallowMount(JSONInput)
    wrapper.setData({ input: '{}' })
    await Vue.nextTick()
    expect(wrapper.vm.isValid).toEqual(true)
  })

  it('emits error when invalid JSON', async () => {
    const wrapper = shallowMount(JSONInput)
    wrapper.setData({ input: 'OHAI' })
    expect(wrapper.vm.isValid).toEqual(false)
    expect(wrapper.emitted().error[0]).toEqual([
      'Unexpected token O in JSON at position 0',
    ])
  })

  it('emits JSON when valid JSON', async () => {
    const wrapper = shallowMount(JSONInput)
    const input = { valid: 'JSON' }
    wrapper.setData({ input: JSON.stringify(input) })
    expect(wrapper.vm.isValid).toEqual(true)
    expect(wrapper.emitted().error).toEqual(undefined)
    expect(wrapper.emitted().input[0]).toEqual([input])
  })

  it('sets error style', async () => {
    const wrapper = shallowMount(JSONInput)
    wrapper.setData({ input: 'OHAI' })
    await Vue.nextTick()
    expect(wrapper.find('textarea').classes()).toContain('is-danger')
  })

  it('shows blank input as valid', async () => {
    const wrapper = shallowMount(JSONInput)
    expect(wrapper.vm.isValid).toEqual(true)
  })

  it('emits input when deleted', async () => {
    const wrapper = shallowMount(JSONInput)
    const input = { valid: 'JSON' }
    wrapper.setData({ input: JSON.stringify(input) })
    expect(wrapper.vm.isValid).toEqual(true)
    wrapper.setData({ input: '' })
    expect(wrapper.emitted().input[1]).toEqual([null])
  })
})
