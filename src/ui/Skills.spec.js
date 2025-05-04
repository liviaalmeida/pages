import { mount } from '@vue/test-utils'
import Skills from './Skills.vue'

const skills = [
  {
    name: 'Super',
    listing: [
      'Chopping',
      'Slicing',
      'Cooking',
      'Baking',
    ],
    stars: 5,
  },
  {
    intro: 'Qualifications',
    name: 'Good',
    listing: [
      'Hammering',
      'Drilling',
      'Assembling',
    ],
    stars: 4,
  },
]
const title = 'Some skills'
const options = { propsData: { skills, title } }

describe('Skills', () => {
  it('renders skills', () => {
    const wrapper = mount(Skills, options)
    const root = wrapper.find('div.skills')
    expect(root.exists()).to.be.true
  })

  it('renders title', () => {
    const wrapper = mount(Skills, options)
    const titleElement = wrapper.find('.skills-title')
    expect(titleElement.text()).to.equal(title)
  })

  it('renders one item per skill', () => {
    const wrapper = mount(Skills, options)
    const listing = wrapper.findAll('.skills-listing')
    expect(listing).to.have.length(skills.length)
  })

  it('renders the skills with the name', () => {
    const wrapper = mount(Skills, options)
    const listing = wrapper.findAll('.skills-listing')
    listing.forEach((element, index) => {
      const name = element.find('.skills-name')
      const skill = skills[index]

      expect(name.text()).to.equal(skill.name)
    })
  })

  it('renders listing of skillset under skill', () => {
    const wrapper = mount(Skills, options)
    const listing = wrapper.findAll('.skills-listing')
    listing.forEach((element, index) => {
      const items = element.findAll('.skills-item')
      const skill = skills[index]

      items.forEach((item, itemIndex) => {
        expect(item.text()).to.equal(skill.listing[itemIndex])
      })
    })
  })
})
