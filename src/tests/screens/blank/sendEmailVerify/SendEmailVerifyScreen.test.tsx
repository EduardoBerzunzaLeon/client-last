import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { mockSendEmailVerify } from '../../../fixtures/mockServer/mockAuthHandler';
import { renderWithRouter, storeGeneric } from '../../../fixtures/render';
import { tutorApi } from '../../../../redux/services/tutor.api';
import * as authApi from '../../../../redux/auth/auth.api';
import { SendEmailVerifyScreen } from '../../../../screens/blank/sendEmailVerify/SendEmailVerifyScreen';

const mockLocation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation(),
}));

const server = setupServer(mockSendEmailVerify);
const storeRef = storeGeneric;

describe('<SendEmailVerifyScreen />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
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
      mockLocation.mockReturnValue({ state: {}});
      wrapper = render(renderWithRouter(
        SendEmailVerifyScreen,
        { initialEntries: '/send-email-verify', store: storeRef.store },
      ));
    });

    test('should show validation on blur in input and not show any modal', async () => {
      const {
        getByRole, getByLabelText, getByText, queryByText,
      } = wrapper;

      const button = getByRole('button');
      const inputEmail = getByLabelText('Email');

      expect(queryByText(/Error/i)).not.toBeInTheDocument();
      expect(queryByText(/Éxito/i)).not.toBeInTheDocument();
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
      const form = container.querySelector('form');

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      expect(inputEmail).toHaveClass('p-invalid');
      expect(getAllByText('Requerido').length).toBe(1);
    });

    test('should error toast when the register is incorrectly', async () => {
      const {
        container, getByLabelText, getByText,
      } = wrapper;

      const inputEmail = getByLabelText('Email');
      const form = container.querySelector('form');

      await waitFor(() => {
        fireEvent.change(inputEmail, { target: { value: 'NotValidEmail' }});
      });

      await waitFor(() => {
        fireEvent.blur(inputEmail);
      });

      await waitFor(() => {
        expect(getByText('Email no tiene un formato valido')).toBeInTheDocument();
      });

      await waitFor(() => {
        fireEvent.change(inputEmail, { target: { value: 'eduardoberzunzal23@gmail.com' }});
      });

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(getByText(/No se pudo enviar el correo/i)).toBeInTheDocument();
      });
    });

    test('should success toast when the register is correctly', async () => {
      const {
        container, getByLabelText, getByText, queryByText,
      } = wrapper;

      const inputEmail = getByLabelText('Email');

      const form = container.querySelector('form');

      expect(queryByText(/Si encontramos una cuenta/i)).not.toBeInTheDocument();

      await waitFor(() => {
        fireEvent.change(inputEmail, { target: { value: 'eduardoberzunzal@gmail.com' }});
      });

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(getByText('Éxito')).toBeInTheDocument();
        expect(getByText(/Si encontramos una cuenta/i)).toBeInTheDocument();
      });
    });
  });

  test('should send correctly object', async () => {
    const mockCalled = jest.fn();
    jest.spyOn(authApi, 'useSendEmailVerifyMutation')
      .mockImplementation(() => (
        [ mockCalled, { loading: false, reset: jest.fn() }]
      ));

    mockLocation.mockReturnValue({ state: { email: 'eduardoberzunzal@gmail.com' }});

    render(renderWithRouter(
      SendEmailVerifyScreen,
      { initialEntries: '/send-email-verify', store: storeRef.store },
    ));

    await waitFor(() => {
      expect(mockCalled).toHaveBeenCalledWith({
        email: 'eduardoberzunzal@gmail.com',
        url: process.env.REACT_APP_RESET_PASSWORD_URL,
      });
    });
  });

  test('should show a toast success when the component is mounted', async () => {
    mockLocation.mockReturnValue({ state: { email: 'eduardoberzunzal@gmail.com' }});

    const { getByText } = render(renderWithRouter(
      SendEmailVerifyScreen,
      { initialEntries: '/send-email-verify', store: storeRef.store },
    ));

    await waitFor(() => {
      expect(getByText('Éxito')).toBeInTheDocument();
      expect(getByText(/Si encontramos una cuenta/i)).toBeInTheDocument();
    });
  });
});
