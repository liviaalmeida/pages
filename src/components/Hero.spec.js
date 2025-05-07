import { mount } from '@vue/test-utils';
import Hero from './Hero.vue';

describe('Hero', () => {
  it('renders hero', () => {
    const wrapper = mount(Hero);
    const root = wrapper.find('section.hero');
    expect(root.exists()).to.be.true;
  });
});
