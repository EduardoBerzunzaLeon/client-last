import { mount } from 'enzyme';

import { render, mockStore } from '../../fixtures/render';
import MenuTop from '../../../components/menuTop/MenuTop';

describe('<MenuTop />', () => {
  test('should render menu top and set openSider option ', () => {
    const storeRef = mockStore();
    const wrapper = mount(render(MenuTop, storeRef.store));

    const button = wrapper.find('.layout-menu-button');
    expect(button.exists()).toBe(true);
    expect(storeRef.store.getState().ui.siderOpen).toBe(false);

    button.simulate('click');

    expect(storeRef.store.getState().ui.siderOpen).toBe(true);
  });
});
