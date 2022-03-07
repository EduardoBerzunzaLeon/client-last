import { mount } from 'enzyme';

import { authApi } from '../../../redux/auth/auth.api';
import { renderWithRouter } from '../../fixtures/render';
import { setupApiStore } from '../../fixtures/redux/setupApiStore';
import authSlice from '../../../redux/auth/auth.slice';
import Routes from '../../../router/routes/Routes';
import uiSlice from '../../../redux/ui/ui.slice';

describe('<Routes />', () => {
  test('should render a <HomeScreen/> when the user is logged', async () => {
    const storeRefWithValues = setupApiStore(
      authApi,
      [],
      { auth: authSlice, ui: uiSlice },
      { auth: { user: 'hi', token: 'hi2' }, ui: { siderOpen: false }},
    );

    const wrapper = mount(renderWithRouter(Routes, { store: storeRefWithValues.store }));

    expect(wrapper.find('PublicRoute').exists()).toBe(false);
    expect(wrapper.find('HomeScreen').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(true);
  });

  test('should redirect to private route when user is logged', async () => {
    const storeRefWithValues = setupApiStore(
      authApi,
      [],
      { auth: authSlice, ui: uiSlice },
      { auth: { user: 'hi', token: 'hi2' }, ui: { siderOpen: false }},
    );

    const wrapper = mount(renderWithRouter(Routes, { initialEntries: '/login', store: storeRefWithValues.store }));

    expect(wrapper.find('PublicRoute').exists()).toBe(false);
    expect(wrapper.find('HomeScreen').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(true);
  });

  test('should render a public route by default', () => {
    const wrapper = mount(renderWithRouter(Routes, {}));

    expect(wrapper.find('PublicRoute').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(false);
    expect(wrapper.html().trim()).toEqual('cargando');
  });

  test('snpmhould redirect to public route when the user is not logged', () => {
    const wrapper = mount(renderWithRouter(Routes, { initialEntries: '/admin' }));

    expect(wrapper.find('PublicRoute').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(false);
  });
});
