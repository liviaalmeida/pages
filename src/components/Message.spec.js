import { flushPromises, mount } from '@vue/test-utils'
import JSCookie from 'js-cookie'
import mixpanel from 'mixpanel-browser'
import { sendMail } from '@/assets/js'
import { keys } from '@/composables/storage'

import Captcha from '@/ui/Captcha.vue'
import Modal from '@/ui/Modal.vue'

import Message from './Message.vue'

vi.mock('mixpanel-browser')
vi.mock('@/assets/js', () => ({
  initCaptcha: () => ({
    reset: vi.fn(() => null),
    validate: vi.fn(() => null),
  }),
  sendMail: vi.fn(async () => {}),
}))

describe('Message', () => {
  beforeEach(() => {
    localStorage.clear()
    JSCookie.remove(keys.abuse)
  })

  afterEach(async () => {
    await flushPromises()
  })

  it('renders message', () => {
    const wrapper = mount(Message)
    const root = wrapper.find('form.message')
    expect(root.exists()).to.be.true
  })

  it('disables form on mount if captcha was previously abused', async () => {
    JSCookie.set(keys.abuse, '1')
    const wrapper = mount(Message)
    const button = wrapper.find('.message-submit')
    expect(button.isDisabled()).to.be.true
  })

  it('checks form validity', async () => {
    const wrapper = mount(Message)
    const message = wrapper.find('.message-text textarea')
    await message.setValue('Message')
    const button = wrapper.find('.message-submit')
    expect(button.isDisabled()).to.be.true
  })

  it('sets validity to true if form is well filled', async () => {
    const wrapper = mount(Message)
    const message = wrapper.find('.message-text textarea')
    await message.setValue('Message')
    const captcha = wrapper.find('.message-captcha input')
    await captcha.setValue('1')
    const button = wrapper.find('.message-submit')
    expect(button.isDisabled()).to.be.false
  })

  it('disables the button on form submit', async () => {
    const wrapper = mount(Message)
    const form = wrapper.find('form.message')
    await form.trigger('submit')
    const button = wrapper.find('.message-submit')
    expect(button.isDisabled()).to.be.true
  })

  it('calls sendMail when captcha validates a success', async () => {
    const wrapper = mount(Message)
    const captcha = wrapper.findComponent(Captcha)
    await captcha.vm.$emit('success')
    expect(sendMail).toHaveBeenCalled()
  })

  it('sets an error if sendMail is not successful', async () => {
    const trackSpy = vi.spyOn(mixpanel, 'track')
    const error = 'Error!'
    sendMail.mockRejectedValueOnce({ message: error })
    const wrapper = mount(Message)
    const captcha = wrapper.findComponent(Captcha)
    await captcha.vm.$emit('success')
    await flushPromises()
    expect(trackSpy).toHaveBeenCalledWith('Message-error-send', { error })
  })

  it('disables the form if captcha is abused', async () => {
    const wrapper = mount(Message)
    const captcha = wrapper.findComponent(Captcha)
    await captcha.vm.$emit('abuse')
    const button = wrapper.find('.message-submit')
    expect(button.isDisabled()).to.be.true
  })

  it('sets an error if captcha is incorrect', async () => {
    const trackSpy = vi.spyOn(mixpanel, 'track')
    const wrapper = mount(Message)
    const captcha = wrapper.findComponent(Captcha)
    await captcha.vm.$emit('error')
    expect(trackSpy).toHaveBeenCalled()
  })

  it('sets the message name if input model changes', async () => {
    const model = 'Blabla'
    const wrapper = mount(Message)
    const name = wrapper.find('.message-name input')
    await name.setValue(model)
    expect(wrapper.vm.email.name).to.equal(model)
  })

  it('sets the message subject if input model changes', async () => {
    const model = 'Blabla'
    const wrapper = mount(Message)
    const subject = wrapper.find('.message-subject input')
    await subject.setValue(model)
    expect(wrapper.vm.email.subject).to.equal(model)
  })

  it('sets the message email if input model changes', async () => {
    const model = 'Blabla'
    const wrapper = mount(Message)
    const email = wrapper.find('.message-email input')
    await email.setValue(model)
    expect(wrapper.vm.email.email).to.equal(model)
  })

  it('sets the message email if input model changes', async () => {
    const model = 'Blabla'
    const wrapper = mount(Message)
    const message = wrapper.find('.message-text textarea')
    await message.setValue(model)
    expect(wrapper.vm.email.message).to.equal(model)
  })

  it('sets the captcha if input model changes', async () => {
    const model = '1'
    const wrapper = mount(Message)
    const captcha = wrapper.find('.message-captcha input')
    await captcha.setValue(model)
    expect(wrapper.vm.captcha).to.equal(model)
  })

  it('closes the modal if modal model changes', async () => {
    const wrapper = mount(Message)
    const captcha = wrapper.findComponent(Captcha)
    await captcha.vm.$emit('error')
    const modal = wrapper.findComponent(Modal)
    await modal.vm.$emit('update:modelValue', false)
    expect(wrapper.vm.modal).to.be.false
  })
})
