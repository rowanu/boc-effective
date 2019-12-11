import { shallowMount } from '@vue/test-utils'
import Report from '@/components/Report.vue'

describe('Report', () => {
  it('it shows a list of actions', async () => {
    const actions = ['s3:ListObjects', 'ec2:DescribeInstances']
    const wrapper = shallowMount(Report, {
      propsData: {
        actions,
      },
    })
    expect(wrapper.findAll('#report .action').length).toEqual(actions.length)
  })
})
