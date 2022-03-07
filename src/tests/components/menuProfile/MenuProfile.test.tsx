import { mount } from 'enzyme';
import { MenuProfile } from '../../../components/menuProfile/MenuProfile';
import { mockStore, renderWithRouter } from '../../fixtures/render';

describe('<MenuProfile />', () => {
  test('should render profile data and the menu is unexpanded', () => {
    const { store } = mockStore({ ui: { siderOpen: true }});
    const wrapper = mount(renderWithRouter(MenuProfile, {
      initialEntries: '/admin',
      store,
    }));

    const { user } = store.getState().auth;
    const img = wrapper.find('img').prop('src');
    expect(img).toEqual(expect.stringContaining(user.avatar));
    expect(wrapper.find('.username').text().trim()).toBe(user.name.first);
    expect(wrapper.find('layout-profile-expanded').exists()).toBe(false);
  });
});
