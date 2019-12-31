import { shallowMount } from '@vue/test-utils'
import Report from '@/components/Report.vue'

describe('Report', () => {
  it('it shows a list of resources', async () => {
    const report = { resources: [{ name: 'bucket' }, { name: 'topic' }] }
    const wrapper = shallowMount(Report, {
      propsData: {
        report,
      },
    })
    // TODO: Remove class-based assertions
    expect(wrapper.findAll('#report .resource').length).toEqual(
      report.resources.length
    )
    expect(wrapper.text()).toContain(report.resources[0].name)
  })

  it('it shows a list of actions by resource', async () => {
    const report = {
      resources: [{ name: 'bucket-resource', actions: ['list-action'] }],
    }
    const wrapper = shallowMount(Report, {
      propsData: {
        report,
      },
    })
    expect(wrapper.text()).toContain(report.resources[0].actions[0])
  })

  it('it shows a count of actions by resource', async () => {
    const report = {
      resources: [{ name: 'bucket-resource', actions: ['list-action'] }],
    }
    const wrapper = shallowMount(Report, {
      propsData: {
        report,
      },
    })
    expect(wrapper.text()).toContain('1 actions')
  })
})
