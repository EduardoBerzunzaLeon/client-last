import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  render,
  waitFor,
} from '@testing-library/react';

import { mockEmailVerify } from '../../../fixtures/mockServer/mockAuthHandler';
import { renderWithRouter, storeGeneric } from '../../../fixtures/render';
import { tutorApi } from '../../../../redux/services/tutor.api';
import { EmailVerifyScreen } from '../../../../screens/blank/emailVerify/EmailVerifyScreen';

const server = setupServer(mockEmailVerify);
const storeRef = storeGeneric;
const mockParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams(),
}));

describe('<ResetPasswordScreen />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    storeRef.store.dispatch(tutorApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  test('should render success email sending', async () => {
    mockParams.mockReturnValue({ token: '123456789' });
    const {
      queryByText,
    } = render(renderWithRouter(EmailVerifyScreen, { initialEntries: '/reset-password/:token', store: storeRef.store }));

    expect(queryByText(/Verificando/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText(/Si logramos verificar/i)).toBeInTheDocument();
      expect(queryByText(/Ir a inicio de sesión/i)).toBeInTheDocument();
      expect(queryByText(/Verificando/i)).not.toBeInTheDocument();
    });
  });

  test('should render error email sending', async () => {
    mockParams.mockReturnValue({ token: 'noValid' });
    const {
      queryByText,
    } = render(renderWithRouter(EmailVerifyScreen, { initialEntries: '/reset-password/:token', store: storeRef.store }));

    await waitFor(() => {
      expect(queryByText(/Ocurrio un error al momento/i)).toBeInTheDocument();
    });
  });
});
