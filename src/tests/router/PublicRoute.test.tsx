import { mount } from 'enzyme';

import { authApi } from '../../redux/auth/auth.api';
import authSlice from '../../redux/auth/auth.slice';
import { setupApiStore } from '../fixtures/redux/setupApiStore';
import uiSlice from '../../redux/ui/ui.slice';
import { renderWithChildren } from '../fixtures/render';
import { PublicRoute } from '../../router/PublicRoute';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>redirect</span>,
}));

describe('<PublicRoute />', () => {
  test('should call navigate to redirect to the private route', () => {
    const storeRefWithValues = setupApiStore(
      authApi,
      [],
      { auth: authSlice, ui: uiSlice },
      { auth: { user: 'hi', token: 'hi2' }, ui: { siderOpen: false }},
    );

    const wrapper = mount(renderWithChildren(
      PublicRoute,
      { store: storeRefWithValues.store, children: <h1>Hi</h1> },
    ));

    expect(wrapper.find('span').text().trim()).toBe('redirect');
  });

  test('should render the children', () => {
    const wrapper = mount(renderWithChildren(
      PublicRoute,
      { initialEntries: '/', children: <h1>Hi</h1> },
    ));

    expect(wrapper.find('h1').text().trim()).toBe('Hi');
  });
});
