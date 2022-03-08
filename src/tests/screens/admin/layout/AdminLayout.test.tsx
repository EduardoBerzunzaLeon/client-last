import { mount } from 'enzyme';

import { mockStore, renderWithRouter } from '../../../fixtures/render';
import AdminLayout from '../../../../screens/admin/layout/AdminLayout';
import { openSider } from '../../../../redux/ui/ui.slice';

describe('<AdminLayout />', () => {
  test('should math to snapshot', () => {
    const storeRef = mockStore();
    storeRef.store.dispatch(openSider());

    const wrapper = mount(renderWithRouter(AdminLayout, { store: storeRef.store }));

    const sidebar = wrapper.find('Sidebar');

    expect(wrapper.find('MenuTop').exists()).toBe(true);
    expect(sidebar.prop('visible')).toBe(true);

    (sidebar.prop('onHide') as any)();

    wrapper.update();
    const newSidebar = wrapper.find('Sidebar');
    expect(newSidebar.prop('visible')).toBe(false);
  });
});
