import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { mockStoreWithMiddlewares, renderWithProps } from '../../../../fixtures/render';
import { mockUpdatePassword } from '../../../../fixtures/mockServer/mockAuthHandler';
import { tutorApi } from '../../../../../redux/services/tutor.api';
import { userLogged } from '../../../../fixtures/testData/fakeAuthData';
// import * as userApi from '../../../../../redux/user/user.api';
import { PasswordForm } from '../../../../../screens/admin/profile/components/PasswordForm';
import * as authApi from '../../../../../redux/auth/auth.api';

const server = setupServer(mockUpdatePassword);
const storeRef = mockStoreWithMiddlewares();

describe('<PasswordForm />', () => {
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

  describe('PasswordForm component without mock hook', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      wrapper = render(
        renderWithProps(
          PasswordForm,
          { userId: userLogged.data.id },
          { initialEntries: '/admin/users/', store: storeRef.store },
        ),
      );
    });

    test('should show validation on blur and verify password and confirmPassword be the same', async () => {
      const {
        container, getByRole, getAllByText, queryByText,
      } = wrapper;

      const button = getByRole('button');
      const containerCurrent = container.querySelector('#currentPassword');
      const containerPass = container.querySelector('#password');
      const containerConfirm = container.querySelector('#confirmPassword');
      const form = container.querySelector('form');

      expect(button).toBeDisabled();

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      expect(containerCurrent).toHaveClass('p-invalid');
      expect(containerPass).toHaveClass('p-invalid');
      expect(containerConfirm).toHaveClass('p-invalid');
      expect(getAllByText('Requerido').length).toBe(3);

      const inputCurrent = container.querySelector('input[name="currentPassword"]');
      const inputPass = container.querySelector('input[name="password"]');
      const inputConfirm = container.querySelector('input[name="confirmPassword"]');

      if (inputPass && inputConfirm && inputCurrent) {
        await waitFor(() => {
          fireEvent.change(inputCurrent, { target: { value: '12345678' }});
          fireEvent.change(inputPass, { target: { value: '12345678' }});
          fireEvent.change(inputConfirm, { target: { value: '123456787' }});
        });

        await waitFor(() => {
          fireEvent.blur(inputConfirm);
        });
      }

      await waitFor(() => {
        expect(queryByText(/Las contraseñas tienen/i)).toBeInTheDocument();
        expect(queryByText(/La nueva contraseña tiene/i)).toBeInTheDocument();
      });
    });

    test('should password update correctly and reset password', async () => {
      const {
        getByText, container,
      } = wrapper;

      const form = container.querySelector('form');
      const inputCurrent = container.querySelector('input[name="currentPassword"]');
      const inputPass = container.querySelector('input[name="password"]');
      const inputConfirm = container.querySelector('input[name="confirmPassword"]');

      // ? Send incorrent current password
      if (inputPass && inputConfirm && inputCurrent) {
        await waitFor(() => {
          fireEvent.change(inputCurrent, { target: { value: '123456781' }});
          fireEvent.change(inputPass, { target: { value: '123456789' }});
          fireEvent.change(inputConfirm, { target: { value: '123456789' }});
        });
      }

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(getByText('No tiene autorización')).toBeInTheDocument();
      });

      if (inputCurrent) {
        await waitFor(() => {
          fireEvent.change(inputCurrent, { target: { value: '12345678' }});
        });
      }

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(getByText('El usuario se actualizó con éxito')).toBeInTheDocument();
      });

      // ? Send correct current password
    });
  });

  test('should send correctly object', async () => {
    const mockCalled = jest.fn();
    jest.spyOn(authApi, 'useUpdatePasswordMutation').mockImplementation(() => ([
      mockCalled,
      { loading: false, reset: jest.fn() },
    ]));

    const current = '12345678';
    const newPassword = '123456789';

    const { container } = render(
      renderWithProps(
        PasswordForm,
        { userId: userLogged.data.id },
        { initialEntries: '/admin/users/', store: storeRef.store },
      ),
    );

    const form = container.querySelector('form');
    const inputCurrent = container.querySelector('input[name="currentPassword"]');
    const inputPass = container.querySelector('input[name="password"]');
    const inputConfirm = container.querySelector('input[name="confirmPassword"]');

    // ? Send incorrent current password
    if (inputPass && inputConfirm && inputCurrent) {
      await waitFor(() => {
        fireEvent.change(inputCurrent, { target: { value: current }});
        fireEvent.change(inputPass, { target: { value: newPassword }});
        fireEvent.change(inputConfirm, { target: { value: newPassword }});
      });
    }

    if (form) {
      await waitFor(() => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(mockCalled).toHaveBeenCalledWith({
        id: userLogged.data.id,
        confirmPassword: newPassword,
        password: newPassword,
        currentPassword: current,
      });
    });
  });
});
