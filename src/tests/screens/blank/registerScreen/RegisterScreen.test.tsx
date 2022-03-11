import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { mockRegister } from '../../../fixtures/mockServer/mockAuthHandler';
import { renderWithRouter, storeGeneric } from '../../../fixtures/render';
import { tutorApi } from '../../../../redux/services/tutorApi';
import * as authApi from '../../../../redux/auth/auth.api';
import RegisterScreen from '../../../../screens/blank/registerScreen/RegisterScreen';

Storage.prototype.setItem = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const server = setupServer(mockRegister);
const storeRef = storeGeneric;

describe('<RegisterComponent />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
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
      wrapper = render(renderWithRouter(RegisterScreen, { initialEntries: '/register', store: storeRef.store }));
    });

    test('should show validation on blur in input', async () => {
      const { getByRole, getByLabelText, getByText } = wrapper;

      const button = getByRole('button', { name: /Crear una cuenta/i });
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
      } = wrapper;

      const inputEmail = getByLabelText('Email');
      const inputFirst = getByLabelText('Nombre*');
      const inputLast = container.querySelector('#last');
      const inputPass = container.querySelector('#password');
      const inputConfirm = container.querySelector('#confirmPassword');

      const form = container.querySelector('form');

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      expect(inputEmail).toHaveClass('p-invalid');
      expect(inputLast).toHaveClass('p-invalid');
      expect(inputFirst).toHaveClass('p-invalid');
      expect(inputPass).toHaveClass('p-invalid');
      expect(inputConfirm).toHaveClass('p-invalid');

      expect(getAllByText('Requerido').length).toBe(5);
    });

    test('should error toast when the register is incorrectly', async () => {
      const {
        container, getByLabelText, getAllByRole, getAllByText, getByText,
      } = wrapper;

      const inputFirst = container.querySelector('#first');
      const inputLast = container.querySelector('#last');
      const inputEmail = getByLabelText('Email');
      const inputPass = container.querySelector('input[name="password"]');
      const inputConfirm = container.querySelector('input[name="confirmPassword"]');
      const checkbox = getAllByRole('radio')[0];

      const form = container.querySelector('form');

      if (inputPass && inputFirst && inputLast && inputConfirm && checkbox) {
        await waitFor(() => {
          fireEvent.change(inputFirst, { target: { value: 'eeduardo' }});
          fireEvent.change(inputEmail, { target: { value: 'NotValidEmail' }});
          fireEvent.change(inputLast, { target: { value: 'jesus' }});
          fireEvent.change(inputPass, { target: { value: '123456787' }});
          fireEvent.change(inputConfirm, { target: { value: '12345678' }});
          fireEvent.click(checkbox);
        });

        await waitFor(() => {
          fireEvent.blur(inputEmail);
          fireEvent.blur(inputConfirm);
        });
      }

      await waitFor(() => {
        expect(getAllByText('Las contraseñas tienen que ser iguales').length).toBe(1);
        expect(getByText('Email no tiene un formato valido')).toBeInTheDocument();
      });

      if (inputPass && inputConfirm) {
        await waitFor(() => {
          fireEvent.change(inputEmail, { target: { value: 'eduardoberzunzal@gmail.com' }});
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
        expect(getByText('El email ya ha sido ocupado.')).toBeInTheDocument();
      });
    });

    test('should success toast when the register is correctly and reset form', async () => {
      const {
        container, getByLabelText, getAllByRole, queryByText, getByText,
      } = wrapper;

      const inputFirst = container.querySelector('#first');
      const inputLast = container.querySelector('#last');
      const inputEmail = getByLabelText('Email');
      const inputPass = container.querySelector('input[name="password"]');
      const inputConfirm = container.querySelector('input[name="confirmPassword"]');
      const checkbox = getAllByRole('radio')[0];

      const form = container.querySelector('form');

      if (inputPass && inputFirst && inputLast && inputConfirm && checkbox) {
        await waitFor(() => {
          fireEvent.change(inputFirst, { target: { value: 'eeduardo' }});
          fireEvent.change(inputEmail, { target: { value: 'fatibb@gmail.com' }});
          fireEvent.change(inputLast, { target: { value: 'jesus' }});
          fireEvent.change(inputPass, { target: { value: '12345678' }});
          fireEvent.change(inputConfirm, { target: { value: '12345678' }});
          fireEvent.click(checkbox);
        });
      }

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(getByText('Éxito')).toBeInTheDocument();
        expect(queryByText('fatibb@gmail.com')).not.toBeInTheDocument();
      });
    });
  });

  test('should send correctly object', async () => {
    const mockCalled = jest.fn();
    jest.spyOn(authApi, 'useSignUpMutation').mockImplementation(() => ([ mockCalled, { loading: false, reset: jest.fn() }]));

    const {
      container, getByLabelText, getAllByRole,
    } = render(renderWithRouter(RegisterScreen, { initialEntries: '/register', store: storeRef.store }));

    const inputFirst = container.querySelector('#first');
    const inputLast = container.querySelector('#last');
    const inputEmail = getByLabelText('Email');
    const inputPass = container.querySelector('input[name="password"]');
    const inputConfirm = container.querySelector('input[name="confirmPassword"]');
    const checkbox = getAllByRole('radio')[0];

    const form = container.querySelector('form');

    if (inputPass && inputFirst && inputLast && inputConfirm && checkbox) {
      await waitFor(() => {
        fireEvent.change(inputFirst, { target: { value: 'eeduardo' }});
        fireEvent.change(inputEmail, { target: { value: 'fatibb@gmail.com' }});
        fireEvent.change(inputLast, { target: { value: 'jesus' }});
        fireEvent.change(inputPass, { target: { value: '12345678' }});
        fireEvent.change(inputConfirm, { target: { value: '12345678' }});
        fireEvent.click(checkbox);
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
        email: 'fatibb@gmail.com',
        gender: 'M',
        name: { first: 'eeduardo', last: 'jesus' },
        password: '12345678',
        url: 'http://localhost:3000/email-verify/',
      });
    });
  });
});
