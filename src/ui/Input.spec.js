import { mount } from '@vue/test-utils'

import Input from './Input.vue'

const attrs = { disabled: true }
const label = 'Input test label'
const options = { propsData: { label } }

describe('Input', () => {
  it('renders input', () => {
    const wrapper = mount(Input, options)
    const root = wrapper.find('div.input')
    expect(root.exists()).to.be.true
  })

  it('renders input label', () => {
    const wrapper = mount(Input, options)
    const labelElement = wrapper.find('.input-label')
    expect(labelElement.exists()).to.be.true
    expect(labelElement.text()).to.equal(label)
  })

  it('adds a focus class to the wrapper on input focus', async () => {
    const wrapper = mount(Input, options)
    const input = wrapper.find('.input-input')
    await input.trigger('focus')
    expect(wrapper.classes()).to.contain('input--focused')
  })

  it('removes the focus class to the wrapper on input blur', async () => {
    const wrapper = mount(Input, options)
    const input = wrapper.find('.input-input')
    await input.trigger('focus')
    await input.trigger('blur')
    expect(wrapper.classes()).not.to.contain('input--focused')
  })

  it('adds a disabled class to the wrapper on $attrs disabled', async () => {
    const wrapper = mount(Input, { ...options, attrs })
    expect(wrapper.classes()).to.contain('input--disabled')
  })

  it('disables the input on $attrs disabled', async () => {
    const wrapper = mount(Input, { ...options, attrs })
    const input = wrapper.find('.input-input')
    expect(input.isDisabled()).to.be.true
  })

  it('emits a model event on input', async () => {
    const wrapper = mount(Input, options)
    const input = wrapper.find('.input-input')
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')).to.have.length(1)
  })
})
