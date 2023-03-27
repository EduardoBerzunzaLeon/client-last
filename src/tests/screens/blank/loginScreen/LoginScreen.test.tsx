import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { LoginScreen } from '../../../../screens/blank/loginScreen/LoginScreen';
import { renderWithRouter, storeGeneric } from '../../../fixtures/render';

import { tutorApi } from '../../../../redux/services/tutor.api';
import { mockLoginError, mockLoginSuccess } from '../../../fixtures/mockServer/mockAuthHandler';

Storage.prototype.setItem = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const server = setupServer(mockLoginError);
const storeRef = storeGeneric;

describe('<LoginComponent />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    storeRef.store.dispatch(tutorApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  test('should show validation on blur in input', async () => {
    const { getByRole, getByLabelText, getByText } = render(
      renderWithRouter(
        LoginScreen,
        { initialEntries: '/login', store: storeRef.store },
      ),
    );

    const button = getByRole('button', { name: /Iniciar Sesión/i });
    const inputEmail = getByLabelText('Email');

    expect(button).toBeDisabled();

    if (inputEmail) {
      await waitFor(() => {
        fireEvent.blur(inputEmail);
      });
    }

    expect(inputEmail).toHaveClass('p-invalid');
    expect(getByText('Requerido')).toBeInTheDocument();
  });

  test('should show validation on submit form', async () => {
    const {
      container, getByLabelText, getAllByText,
    } = render(renderWithRouter(LoginScreen, { initialEntries: '/login' }));

    const inputEmail = getByLabelText('Email');
    const inputPass = container.querySelector('#password');
    const form = container.querySelector('form');

    if (form) {
      await waitFor(() => {
        fireEvent.submit(form);
      });
    }

    expect(inputEmail).toHaveClass('p-invalid');
    expect(inputPass).toHaveClass('p-invalid');
    expect(getAllByText('Requerido').length).toBe(2);
  });

  test('should error toast when the login is incorrectly', async () => {
    const {
      container, getByLabelText, getByText,
    } = render(renderWithRouter(LoginScreen, { initialEntries: '/login', store: storeRef.store }));

    const inputEmail = getByLabelText('Email');
    const inputPass = container.querySelector('input[name="password"]');
    const form = container.querySelector('form');

    if (inputEmail && inputPass) {
      await waitFor(() => {
        fireEvent.change(inputEmail, { target: { value: 'eduardo@berzunza.com' }});
        fireEvent.change(inputPass, { target: { value: '12345678' }});
      });
    }

    if (form) {
      await waitFor(() => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(getByText('El correo aun no ha sido activado')).toBeInTheDocument();
    });

    jest.runOnlyPendingTimers();
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('should logging correctly and save the user in localStorage', async () => {
    server.use(mockLoginSuccess);

    const {
      container, getByLabelText,
    } = render(renderWithRouter(
      LoginScreen,
      { initialEntries: '/login', store: storeRef.store },
    ));

    const inputEmail = getByLabelText('Email');
    const inputPass = container.querySelector('input[name="password"]');
    const form = container.querySelector('form');

    if (inputEmail && inputPass) {
      await waitFor(() => {
        fireEvent.change(inputEmail, { target: { value: 'eduardo@berzunza.com' }});
        fireEvent.change(inputPass, { target: { value: '12345678' }});
      });
    }

    if (form) {
      await waitFor(() => {
        fireEvent.submit(form);
      });
    }

    act(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
      expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(String));
    });
  });
});
