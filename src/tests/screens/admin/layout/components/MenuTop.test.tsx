import { mount } from 'enzyme';

import { MenuTop } from '../../../../../screens/admin/layout/components/MenuTop';
import { renderWithRouter, mockStore } from '../../../../fixtures/render';
import { userLogged } from '../../../../fixtures/testData/fakeAuthData';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<MenuTop />', () => {
  test('should render menu top and set openSider option ', () => {
    const storeRef = mockStore();
    const wrapper = mount(renderWithRouter(MenuTop, { initialEntries: '/admin', store: storeRef.store }));

    const button = wrapper.find('.layout-menu-button');
    const schoolYearData = storeRef.store.getState().schoolYear;

    const span = wrapper.find({ children: `Primera Fase ${schoolYearData.period.start} - ${schoolYearData.period.end}` });
    expect(button.exists()).toBe(true);
    expect(span.exists()).toBe(true);
    expect(storeRef.store.getState().ui.siderOpen).toBe(false);

    button.simulate('click');

    expect(storeRef.store.getState().ui.siderOpen).toBe(true);
  });

  test('should expand the menu, redirect to profile and clear auth in store', () => {
    const storeRef = mockStore();
    const wrapper = mount(renderWithRouter(MenuTop, { initialEntries: '/admin', store: storeRef.store }));

    wrapper.find('button.p-link').last().simulate('click');

    wrapper.find('a.p-menuitem-link').at(0).simulate('click');
    expect(mockNavigate).toBeCalledWith(`/admin/users/${userLogged.data.id}`);

    wrapper.find('a.p-menuitem-link').last().simulate('click');
    const { user, token } = storeRef.store.getState().auth;
    expect(user).toBeNull();
    expect(token).toBeNull();
  });
});
