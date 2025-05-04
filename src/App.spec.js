import { mount } from '@vue/test-utils'
import mixpanel from 'mixpanel-browser'

import App from './App.vue'

vi.mock('mixpanel-browser')
vi.mock('@/assets/js/captcha')

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders app', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).to.be.true
  })

  it('sends a page view on mount', () => {
    const trackSpy = vi.spyOn(mixpanel, 'track')
    const wrapper = mount(App)
    expect(trackSpy).toHaveBeenCalledWith('Page-view')
  })
})
