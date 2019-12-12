import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Document from '@/components/Document.vue'

// https://devdocs.io/javascript/errors/json_bad_parse

describe('Document', () => {
  it('is empty when created', async () => {
    const wrapper = shallowMount(Document)
    expect(wrapper.emitted().isEmpty[0]).toEqual([true])
  })

  it('flags invalid JSON', async () => {
    const wrapper = shallowMount(Document)
    wrapper.setData({ input: 'OHAI' })
    expect(wrapper.vm.isValid).toEqual(false)
  })

  it('allows valid JSON', async () => {
    const wrapper = shallowMount(Document)
    wrapper.setData({ input: '{}' })
    expect(wrapper.vm.isValid).toEqual(true)
  })

  it('emits error on invalid JSON', async () => {
    const wrapper = shallowMount(Document)
    wrapper.setData({ input: 'OHAI' })
    expect(wrapper.vm.isValid).toEqual(false)
    expect(wrapper.emitted().error[0]).toEqual([
      'Unexpected token O in JSON at position 0',
    ])
  })
})
