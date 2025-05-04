import { mount } from '@vue/test-utils'
import Coffee from './Coffee.vue'

describe('Coffee', () => {
  it('renders coffee', () => {
    const wrapper = mount(Coffee)
    const root = wrapper.find('div.coffee')
    expect(root.exists()).to.be.true
  })
})
