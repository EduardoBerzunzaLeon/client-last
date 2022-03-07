import { mount } from 'enzyme';

import { authApi } from '../../redux/auth/auth.api';
import authSlice from '../../redux/auth/auth.slice';
import { setupApiStore } from '../fixtures/redux/setupApiStore';
import uiSlice from '../../redux/ui/ui.slice';
import { renderWithChildren } from '../fixtures/render';
import PrivateRoute from '../../router/PrivateRoute';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>redirect</span>,
}));

describe('<PrivateRoute />', () => {
  test('should render the children', () => {
    const storeRefWithValues = setupApiStore(
      authApi,
      [],
      { auth: authSlice, ui: uiSlice },
      { auth: { user: 'hi', token: 'hi2' }, ui: { siderOpen: false }},
    );

    const wrapper = mount(renderWithChildren(
      PrivateRoute,
      { store: storeRefWithValues.store, children: <h1>Hi</h1> },
    ));

    expect(wrapper.find('h1').text().trim()).toBe('Hi');
  });

  test('should call navigate to redirect to the private route', () => {
    const wrapper = mount(renderWithChildren(
      PrivateRoute,
      { initialEntries: '/login', children: <h1>Hi</h1> },
    ));

    expect(wrapper.find('span').text().trim()).toBe('redirect');
  });
});
