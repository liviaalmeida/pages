import { mount } from '@vue/test-utils'
import Hamburger from './Hamburger.vue'

const options = { propsData: { modelValue: false } }

describe('Hamburger', () => {
  it('renders hamburger', () => {
    const wrapper = mount(Hamburger, options)
    const root = wrapper.find('label.hamburger')
    expect(root.exists()).to.be.true
  })

  it('renders 3 hamburger lines', () => {
    const wrapper = mount(Hamburger, options)
    const lines = wrapper.findAll('.hamburger-line')
    expect(lines).to.have.length(3)
  })

  it('emits an update model on input check', async () => {
    const wrapper = mount(Hamburger, options)
    const check = wrapper.find('.hamburger-checkbox')
    await check.setChecked()
    expect(wrapper.emitted('update:modelValue')).to.have.length(1)
  })

  it('updates the checked value if model changes', async () => {
    const wrapper = mount(Hamburger, options)
    await wrapper.setProps({ modelValue: true })
    const check = wrapper.find('.hamburger-checkbox')
    expect(check.element.checked).to.be.true
  })
})
