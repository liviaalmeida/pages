import { mount } from '@vue/test-utils'

import Section from './Section.vue'

const title = 'Section Title'
const options = { propsData: { title } }

describe('Section', () => {
  it('renders section', () => {
    const wrapper = mount(Section)
    const root = wrapper.find('section.section')
    expect(root.exists()).to.be.true
  })

  it('renders title if one is provided', () => {
    const wrapper = mount(Section, options)
    const titleElement = wrapper.find('.section-title')
    expect(titleElement.exists()).to.be.true
    expect(titleElement.text()).to.equal(title)
  })
})
