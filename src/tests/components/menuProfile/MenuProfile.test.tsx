import { mount } from 'enzyme';
import { MenuProfile } from '../../../components/menuProfile/MenuProfile';
import {
  mockStore,
  renderWithRouter,
  StoreRef,
  Wrapper,
} from '../../fixtures/render';

describe('<MenuProfile />', () => {
  let storeRef: StoreRef;
  let wrapper: Wrapper;

  beforeEach(() => {
    storeRef = mockStore({ ui: { siderOpen: true }});
    wrapper = mount(renderWithRouter(MenuProfile, {
      initialEntries: '/admin',
      store: storeRef.store,
    }));
  });

  test('should render profile data and the menu is unexpanded', () => {
    const { user } = storeRef.store.getState().auth;
    const img = wrapper.find('img').prop('src');
    expect(img).toEqual(expect.stringContaining(user.avatar));
    expect(wrapper.find('.username').text().trim()).toBe(user.name.first);
    expect(wrapper.find('layout-profile-expanded').exists()).toBe(false);
  });

  test('should expand the menu and clear auth in store', () => {
    wrapper.find('button.layout-profile-link').simulate('click');
    expect(wrapper.find('.layout-profile-expanded').exists()).toBe(true);

    wrapper.find('button.p-link').last().simulate('click');
    const { user, token } = storeRef.store.getState().auth;
    expect(user).toBeNull();
    expect(token).toBeNull();
  });
});
