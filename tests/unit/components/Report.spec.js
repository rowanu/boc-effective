import { shallowMount } from '@vue/test-utils'
import Report from '@/components/Report.vue'

describe('Report', () => {
  it('it shows a list of actions', async () => {
    const actions = ['a', 'b']
    const wrapper = shallowMount(Report, {
      propsData: {
        actions,
      },
    })
    expect(wrapper.findAll('#report .action').length).toEqual(actions.length)
  })

  it('it works with no actions', async () => {
    const actions = []
    const wrapper = shallowMount(Report, {
      propsData: {
        actions,
      },
    })
    expect(wrapper.findAll('#report .action').length).toEqual(actions.length)
  })
})
