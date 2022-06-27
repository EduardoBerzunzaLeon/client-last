import { mount } from 'enzyme';

import { menu } from '../../../../../utils';
import { MenuSlideContent } from '../../../../../screens/admin/layout/components/MenuSlideContent';
import { mockStore, renderWithProps } from '../../../../fixtures/render';

describe('<MenuTop />', () => {
  test('should render correctly menu top and set openSider option ', () => {
    const storeRef = mockStore({ ui: { siderOpen: true }});

    const wrapper = mount(
      renderWithProps(
        MenuSlideContent,
        { model: menu },
        { initialEntries: '/admin', store: storeRef.store },
      ),
    );
    // const activeTwo = wrapper.find('NavLink').at(1);
    const links = wrapper.find('a').length;
    const active = wrapper.find('.active-route').at(0);
    expect(storeRef.store.getState().ui.siderOpen).toBe(true);
    expect(active.prop('to')).toBe('/admin');
    expect(links).toBe(menu.length);

    active.simulate('click');
    expect(storeRef.store.getState().ui.siderOpen).toBe(false);
  });
});
