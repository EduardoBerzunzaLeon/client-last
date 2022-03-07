import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { mount } from 'enzyme';

import { render as renderWithStore } from '../fixtures/render';
import Router from '../../router/Router';

enableFetchMocks();

const mockRenewTokenQuery = jest.fn();

jest.mock('../../redux/auth/auth.api', () => ({
  ...jest.requireActual('../../redux/auth/auth.api'),
  useRenewTokenQuery: () => mockRenewTokenQuery(),
}));

describe('<Router />', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('should render the spinner', () => {
    mockRenewTokenQuery.mockReturnValue({
      isLoading: true,
      isError: false,
    });

    const wrapper = mount(renderWithStore(Router));

    expect(wrapper.find('BrowserRouter').exists()).toBe(false);
    expect(wrapper.find('span').text().trim()).toBe('Cargando Aplicación...');
  });

  test('should render the spinner', () => {
    mockRenewTokenQuery.mockReturnValue({
      isLoading: false,
      isError: false,
    });

    const wrapper = mount(renderWithStore(Router));

    expect(wrapper.find('BrowserRouter').exists()).toBe(true);
    expect(wrapper.find('span').text().trim()).toBe('Cargando Módulo...');
  });
});
