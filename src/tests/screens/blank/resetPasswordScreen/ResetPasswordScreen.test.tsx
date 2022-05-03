import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { mockResetPassword } from '../../../fixtures/mockServer/mockAuthHandler';
import { renderWithRouter, storeGeneric } from '../../../fixtures/render';
import { tutorApi } from '../../../../redux/services/tutor.api';
import * as authApi from '../../../../redux/auth/auth.api';
import ResetPasswordScreen from '../../../../screens/blank/resetPasswordScreen/ResetPasswordScreen';

const server = setupServer(mockResetPassword);
const storeRef = storeGeneric;

const mockNavigate = jest.fn();
const mockParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams(),
}));

describe('<ResetPasswordScreen />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    storeRef.store.dispatch(tutorApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  describe('Register Component withOut mock hook', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      mockParams.mockReturnValue({ token: 'noValid' });
      wrapper = render(renderWithRouter(ResetPasswordScreen, { initialEntries: '/reset-password/:token', store: storeRef.store }));
    });

    test('should show validation on blur and verify password and confirmPassword be the same', async () => {
      const {
        container, getByRole, getAllByText, queryByText,
      } = wrapper;

      const button = getByRole('button');
      const containerPass = container.querySelector('#password');
      const containerConfirm = container.querySelector('#confirmPassword');
      const form = container.querySelector('form');

      expect(button).toBeDisabled();

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      expect(containerPass).toHaveClass('p-invalid');
      expect(containerConfirm).toHaveClass('p-invalid');
      expect(getAllByText('Requerido').length).toBe(2);

      const inputPass = container.querySelector('input[name="password"]');
      const inputConfirm = container.querySelector('input[name="confirmPassword"]');

      if (inputPass && inputConfirm) {
        await waitFor(() => {
          fireEvent.change(inputPass, { target: { value: '123456787' }});
          fireEvent.change(inputConfirm, { target: { value: '12345678' }});
        });

        await waitFor(() => {
          fireEvent.blur(inputConfirm);
        });
      }

      await waitFor(() => {
        expect(queryByText(/Las contraseñas tienen/i)).toBeInTheDocument();
      });
    });

    test('should error toast when the token is incorrectly and redirect to login', async () => {
      const {
        container, queryByText,
      } = wrapper;

      const inputPass = container.querySelector('input[name="password"]');
      const inputConfirm = container.querySelector('input[name="confirmPassword"]');
      const form = container.querySelector('form');

      if (inputPass && inputConfirm) {
        await waitFor(() => {
          fireEvent.change(inputPass, { target: { value: '12345678' }});
          fireEvent.change(inputConfirm, { target: { value: '12345678' }});
        });
      }

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(queryByText('Error en el token.')).toBeInTheDocument();
      });

      jest.runOnlyPendingTimers();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('should send correctly object', async () => {
    const mockCalled = jest.fn();

    jest.spyOn(authApi, 'useResetPasswordMutation')
      .mockImplementation(() => (
        [ mockCalled, { loading: false, reset: jest.fn() }]
      ));

    mockParams.mockReturnValue({ token: 'fake-token' });

    const {
      container,
    } = render(renderWithRouter(
      ResetPasswordScreen,
      { initialEntries: '/reset-password/fake-token', store: storeRef.store },
    ));

    const inputPass = container.querySelector('input[name="password"]');
    const inputConfirm = container.querySelector('input[name="confirmPassword"]');
    const form = container.querySelector('form');

    if (inputPass && inputConfirm) {
      await waitFor(() => {
        fireEvent.change(inputPass, { target: { value: '12345678' }});
        fireEvent.change(inputConfirm, { target: { value: '12345678' }});
      });
    }

    if (form) {
      await waitFor(() => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(mockCalled).toHaveBeenCalledWith({
        confirmPassword: '12345678',
        password: '12345678',
        token: 'fake-token',
      });
    });
  });
});
