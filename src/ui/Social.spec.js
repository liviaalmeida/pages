import { mount } from '@vue/test-utils'
import mixpanel from 'mixpanel-browser'

import Social from './Social.vue'

vi.mock('mixpanel-browser')

const href = 'www.example.com'
const image = 'github'
const text = 'Example'
const options = { propsData: { href, image, text } }

describe('Social', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders social', () => {
    const wrapper = mount(Social, options)
    const root = wrapper.find('a.social')
    expect(root.exists()).to.be.true
  })

  it('renders link with correct attributes', () => {
    const wrapper = mount(Social, options)
    expect(wrapper.attributes('rel')).to.equal('noopener noreferrer')
    expect(wrapper.attributes('target')).to.equal('_blank')
    expect(wrapper.attributes('href')).to.equal(href)
  })

  it('renders text inside link', () => {
    const wrapper = mount(Social, options)
    expect(wrapper.text()).to.equal(text)
  })

  it('sends a mixpanel tracking on link click', async () => {
    const trackSpy = vi.spyOn(mixpanel, 'track')
    const wrapper = mount(Social, options)
    await wrapper.trigger('click')
    expect(trackSpy).to.toHaveBeenCalledWith('Icon-click', { to: href })
  })
})
