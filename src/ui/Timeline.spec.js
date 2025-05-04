import { mount } from '@vue/test-utils'
import mixpanel from 'mixpanel-browser'

import Timeline from './Timeline.vue'

vi.mock('mixpanel-browser')
vi.useFakeTimers()

const timeEvents = [
  {
    title: 'ACME',
    duration: '3 years',
    description: 'responsible for making wood planks',
  },
  {
    title: 'Bob\'s Burgers',
    link: 'www.bobs.com',
    duration: '6 weeks',
    intro: 'Line Cook',
    description: 'cooking the most delicious burgers',
  },
]
const title = 'My timeline'
const options = { propsData: { timeEvents, title } }

describe('Timeline', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllTimers()
  })

  it('renders timeline', () => {
    const wrapper = mount(Timeline, options)
    const root = wrapper.find('div.timeline')
    expect(root.exists()).to.be.true
  })

  it('renders title if one is provided', () => {
    const wrapper = mount(Timeline, options)
    const titleElement = wrapper.find('.timeline-title')
    expect(titleElement.exists()).to.be.true
    expect(titleElement.text()).to.equal(title)
  })

  it('does not render title if one is not provided', () => {
    const notitleOptions = { propsData: { ...options.propsData } }
    delete notitleOptions.propsData.title
    const wrapper = mount(Timeline, notitleOptions)
    const titleElement = wrapper.find('.timeline-title')
    expect(titleElement.exists()).to.be.false
  })

  it('renders line when element is visible', async () => {
    const wrapper = mount(Timeline, options)
    await wrapper.vm.onVisible(true)
    const line = wrapper.find('.timeline-list-line')
    expect(line.exists()).to.be.true
  })

  it('renders one item per time event', () => {
    const wrapper = mount(Timeline, options)
    const items = wrapper.findAll('.timeline-list-item')
    expect(items).to.have.length(timeEvents.length)
  })

  it('renders a heading if event has no link', () => {
    const index = 0
    const wrapper = mount(Timeline, options)
    const item = wrapper.findAll('.timeline-list-item').at(index)
    const heading = item.find('.timeline-list-title')
    expect(heading.exists()).to.be.true
    expect(heading.text()).to.equal(timeEvents[index].title)
  })

  it('renders an anchor if event has a link', () => {
    const index = 1
    const wrapper = mount(Timeline, options)
    const item = wrapper.findAll('.timeline-list-item').at(index)
    const anchor = item.find('.timeline-list-link')
    expect(anchor.exists()).to.be.true
    expect(anchor.attributes('rel')).to.equal('noopener noreferrer')
    expect(anchor.attributes('target')).to.equal('_blank')
    expect(anchor.attributes('href')).to.equal(timeEvents[index].link)
    expect(anchor.text()).to.equal(timeEvents[index].title)
  })

  it('sends a tracking event when the link is clicked', async () => {
    const index = 1
    const trackSpy = vi.spyOn(mixpanel, 'track')
    const wrapper = mount(Timeline, options)
    const link = wrapper.find('.timeline-list-link')
    await link.trigger('click')
    expect(trackSpy).toHaveBeenCalledWith('Event-click', { event: timeEvents[index].title })
  })
})
