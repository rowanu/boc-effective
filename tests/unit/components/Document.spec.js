// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Document from '@/components/Document.vue'

describe('Document.vue', () => {
  it('is empty when created', async () => {
    const wrapper = shallowMount(Document)
    expect(wrapper.emitted().isEmpty[0]).toEqual([true])
  })
})
