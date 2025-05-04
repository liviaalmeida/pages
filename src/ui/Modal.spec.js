import { mount } from '@vue/test-utils'
import Modal from './Modal.vue'

const message = 'This is just some info'
const modelValue = true
const title = 'Warning'
const reason = 'info'
const options = { propsData: { message, modelValue, title, reason } }

describe('Modal', () => {
  it('renders modal', () => {
    const wrapper = mount(Modal, options)
    const root = wrapper.find('div.modal')
    expect(root.exists()).to.be.true
  })

  it('hides modal if modelValue changes', async () => {
    const wrapper = mount(Modal, options)
    await wrapper.setProps({ modelValue: false })
    const root = wrapper.find('div.modal')
    expect(root.exists()).to.be.false
  })

  it('emits a model update if wrapper is clicked', async () => {
    const wrapper = mount(Modal, options)
    const outter = wrapper.find('.modal-wrapper')
    await outter.trigger('click')
    const update = wrapper.emitted('update:modelValue')
    const [ [ value ] ] = update
    expect(update).to.have.length(1)
    expect(value).to.be.false
  })

  it('emits a model update if wrapper is clicked', async () => {
    const wrapper = mount(Modal, options)
    const close = wrapper.find('.modal-close')
    await close.trigger('click')
    const update = wrapper.emitted('update:modelValue')
    const [ [ value ] ] = update
    expect(update).to.have.length(1)
    expect(value).to.be.false
  })
})
