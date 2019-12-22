import { shallowMount } from '@vue/test-utils'
import Report from '@/components/Report.vue'

describe('Report', () => {
  it('it shows a list of resources', async () => {
    const resources = ['bucket', 'topic']
    const wrapper = shallowMount(Report, {
      propsData: {
        resources,
      },
    })
    expect(wrapper.findAll('#report .resource').length).toEqual(
      resources.length
    )
    expect(wrapper.text()).toContain(resources[0])
  })
})
