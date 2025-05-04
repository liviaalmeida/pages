import { flushPromises, mount } from '@vue/test-utils'
import mixpanel from 'mixpanel-browser'

import Hamburger from '@/ui/Hamburger.vue'

import Menu from './Menu.vue'

const options = { attachTo: document.body }

vi.mock('mixpanel-browser')

describe('Menu', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(async () => {
    document.body.replaceChildren([])
    await flushPromises()
  })

  it('renders menu', () => {
    const wrapper = mount(Menu, options)
    const root = wrapper.find('div.menu')
    expect(root.exists()).to.be.true
  })

  it('has one button for each link', () => {
    const wrapper = mount(Menu, options)
    const buttons = wrapper.findAll('button.menu-link')
    const { links } = wrapper.vm
    expect(buttons).to.have.length(links.length)
  })

  it('scrolls to link class on button click', async () => {
    global.scrollTo = vi.fn()
    const wrapper = mount(Menu, options)
    const buttons = wrapper.findAll('button.menu-link')

    for (const button of buttons) {
      const section = document.createElement('section')
      section.classList.add(button.element.dataset['class'])
      document.body.appendChild(section)
      await button.trigger('click')
    }

    expect(global.scrollTo).toHaveBeenCalledTimes(buttons.length)
  })

  it('tracks button click', async () => {
    const trackSpy = vi.spyOn(mixpanel, 'track')
    const wrapper = mount(Menu, options)
    const buttons = wrapper.findAll('button.menu-link')

    for (const button of buttons) {
      const section = document.createElement('section')
      const toClass =  button.element.dataset['class']
      section.classList.add(toClass)
      document.body.appendChild(section)
      await button.trigger('click')
      expect(trackSpy).toHaveBeenCalledWith('Menu-click', { to: toClass })
    }
  })

  it('has no different background on no scroll', () => {
    const wrapper = mount(Menu, options)
    expect(wrapper.classes()).not.to.contain('menu--background')
  })

  it('has a different background on scroll', async () => {
    global.scrollY = 80
    const wrapper = mount(Menu, options)
    await window.dispatchEvent(new Event('scroll'))
    expect(wrapper.classes()).to.contain('menu--background')
  })

  it('removes the scroll listener on component unmount', async () => {
    global.removeEventListener = vi.fn()
    const wrapper = mount(Menu, options)
    await wrapper.unmount()
    expect(global.removeEventListener).toHaveBeenCalled()
  })
})
