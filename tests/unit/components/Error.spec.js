import { shallowMount } from '@vue/test-utils'
import Error from '@/components/Error.vue'

describe('Error', () => {
  it('is shows a message', async () => {
    const message = 'Oh noes'
    const wrapper = shallowMount(Error, {
      propsData: {
        message,
      },
    })
    expect(wrapper.find('#error .message').text()).toEqual(message)
  })
})
