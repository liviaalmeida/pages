import { mount } from '@vue/test-utils'
import Icon from './Icon.vue'

const color = 'green'
const name = 'github'
const options = { propsData: { color, name } }

describe('Icon', () => {
  it('renders ', () => {
    const wrapper = mount(Icon, options)
    const root = wrapper.find('div.icon')
    expect(root.exists()).to.be.true
  })

  it('sets named color as background color', () => {
    const wrapper = mount(Icon, options)
    const icon = wrapper.find('.icon')
    const bgColor = icon.element.style['background-color']
    expect(bgColor).to.contain('rgb')
  })

  it('sets named image as mask image', () => {
    const wrapper = mount(Icon, options)
    const icon = wrapper.find('.icon')
    const mask = icon.element.style['mask-image']
    expect(mask).to.equal(`url('/icons/${name}.svg')`)
  })
})
