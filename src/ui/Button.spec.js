import { mount } from '@vue/test-utils'
import Button from './Button.vue'

vi.useFakeTimers()

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('renders button', () => {
    const wrapper = mount(Button)
    const root = wrapper.find('button.button')
    expect(root.exists()).to.be.true
  })

  it('disables button if loading is set', async () => {
    const wrapper = mount(Button)
    await wrapper.setProps({ loading: true })
    expect(wrapper.isDisabled()).to.be.true
  })

  it('has loading element if loading is set', async () => {
    const wrapper = mount(Button)
    await wrapper.setProps({ loading: true })
    const loading = wrapper.find('.button-loading')
    expect(loading.exists()).to.be.true
  })

  it('disables button if $attrs disabled is set', () => {
    const wrapper = mount(Button, { attrs: { disabled: true } })
    expect(wrapper.isDisabled()).to.be.true
  })

  it('animates button on click', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    const wave = wrapper.find('.button-wave')
    expect(wave.classes()).to.contain('button-wave--animate')
  })

  it('does not re-animate button on click', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    const wave = wrapper.find('.button-wave')
    expect(wave.classes()).to.contain('button-wave--animate')
    expect(wave.classes()).to.have.length(2)
  })

  it('removes animate class after the timer', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    vi.runAllTimers()
    const wave = wrapper.find('.button-wave')
    expect(wave.classes()).not.to.contain('button-wave--animate')
  })
})
