import { mount } from '@vue/test-utils';

import Link from './Link.vue';

const options = {
  propsData: {
    href: 'https://example.com',
  },
};

describe('Link', () => {
  it('renders link', () => {
    const wrapper = mount(Link, options);
    const root = wrapper.find('a.link');
    expect(root.exists()).to.be.true;
  });

  it('sets default target to _blank', () => {
    const wrapper = mount(Link, options);
    const root = wrapper.find('a.link');
    expect(root.attributes('target')).to.equal('_blank');
  });

  it('sets target to prop value if it is defined', () => {
    const target = '_self';
    const wrapper = mount(Link, {
      propsData: {
        ...options.propsData,
        target,
      },
    });
    const root = wrapper.find('a.link');
    expect(root.attributes('target')).to.equal(target);
  });
});
