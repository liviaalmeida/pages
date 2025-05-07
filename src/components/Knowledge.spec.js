import { mount } from '@vue/test-utils';
import Knowledge from './Knowledge.vue';

describe('Knowledge', () => {
  it('renders knowledge', () => {
    const wrapper = mount(Knowledge);
    const root = wrapper.find('section.knowledge');
    expect(root.exists()).to.be.true;
  });
});
