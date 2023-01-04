import { mount } from 'enzyme';

import { mockStore, renderWithRouter } from '../../fixtures/render';
import { Routes } from '../../../router/routes/Routes';

describe('<Routes />', () => {
  test('should render a <HomeScreen/> when the user is logged', async () => {
    const storeRef = mockStore();
    const wrapper = mount(renderWithRouter(Routes, { store: storeRef.store }));

    expect(wrapper.find('PublicRoute').exists()).toBe(false);
    expect(wrapper.find('HomeScreen').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(true);
  });

  test('should redirect to private route when user is logged', async () => {
    const storeRef = mockStore();
    const wrapper = mount(renderWithRouter(Routes, { initialEntries: '/login', store: storeRef.store }));

    expect(wrapper.find('PublicRoute').exists()).toBe(false);
    expect(wrapper.find('HomeScreen').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(true);
  });

  test('should render a public route by default', () => {
    const wrapper = mount(renderWithRouter(Routes, {}));

    expect(wrapper.find('PublicRoute').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(false);
    expect(wrapper.html().trim()).toContain('cargando');
  });

  test('snpmhould redirect to public route when the user is not logged', () => {
    const wrapper = mount(renderWithRouter(Routes, { initialEntries: '/admin' }));

    expect(wrapper.find('PublicRoute').exists()).toBe(true);
    expect(wrapper.find('PrivateRoute').exists()).toBe(false);
  });
});
