import { mount } from '@vue/test-utils'
import Captcha from './Captcha.vue'

const mockChallenge = {
  reset: vi.fn(() => null),
  validate: vi.fn(() => null),
}

vi.mock('@/assets/js', () => ({
  initCaptcha: (_, callback) => {
    mockChallenge.callback = callback
    return mockChallenge
  },
}))

const options = { propsData: { modelValue: '', validate: false } }

describe('Captcha', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders captcha', () => {
    const wrapper = mount(Captcha, options)
    const root = wrapper.find('div.captcha')
    expect(root.exists()).to.be.true
  })

  it('calls challenge validate when validate prop is set', async () => {
    const wrapper = mount(Captcha, options)
    await wrapper.setProps({ validate: true })
    expect(mockChallenge.validate).toHaveBeenCalled()
  })

  it('calls challenge validate when validate prop is unset', async () => {
    const wrapper = mount(Captcha, options)
    await wrapper.setProps({ validate: true })
    await wrapper.setProps({ validate: false })
    expect(mockChallenge.reset).toHaveBeenCalled()
  })

  it('watches the model value prop to update the local model accordingly', async () => {
    const value = '123'
    const wrapper = mount(Captcha, options)
    await wrapper.setProps({ modelValue: value })
    const input = wrapper.find('input')
    expect(input.attributes('modelvalue')).to.equal(value)
  })

  it('emits a success if captcha validates correctly', async () => {
    const wrapper = mount(Captcha, options)
    mockChallenge.callback('success')
    expect(wrapper.emitted('success')).to.have.length(1)
  })

  it('emits an abuse if captcha is not correct and number of tries exceeds', async () => {
    const wrapper = mount(Captcha, options)
    mockChallenge.callback('', undefined, 3)
    expect(wrapper.emitted('abuse')).to.have.length(1)
  })

  it('emits an error if captcha is not correct and number of tries is allowed', async () => {
    const wrapper = mount(Captcha, options)
    mockChallenge.callback('', undefined, 2)
    expect(wrapper.emitted('error')).to.have.length(1)
  })
})
