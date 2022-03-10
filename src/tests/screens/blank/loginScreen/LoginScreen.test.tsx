import { rest } from 'msw';
import { setupServer } from 'msw/node';

import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import LoginScreen from '../../../../screens/blank/loginScreen/LoginScreen';
import { renderWithRouter, storeGeneric } from '../../../fixtures/render';
// import { ErrorResponse, LoginRequest } from '../../../../interfaces/api';
// import { errorResponse } from '../../../fixtures/testData/fakeUtilsData';
import { tutorApi } from '../../../../redux/services/tutorApi';
import { loginFakeData, userLogged } from '../../../fixtures/testData/fakeAuthData';
import { errorResponse } from '../../../fixtures/testData/fakeUtilsData';

// enableFetchMocks();
Storage.prototype.setItem = jest.fn();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    (req, res, ctx) => res(
      ctx.status(401),
      ctx.json(errorResponse.data),
    ),
  ),
];

const server = setupServer(...handlers);

const storeRef = storeGeneric;

describe('<LoginComponent />', () => {
// Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    // storeRef.store.dispatch(tutorApi.util.resetApiState());
    server.resetHandlers();
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  // test send form when send empty data show
  // an error and is correctl
  // y data call login redux
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

  test('should show validation on submit form', async () => {
    // fetchMock.mockResponse(JSON.stringify(userLogged));

    const {
      container, getByLabelText,
    } = render(renderWithRouter(LoginScreen, { initialEntries: '/login' }));

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

    jest.runOnlyPendingTimers();
    // await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    // });
  });

  // mock the feth useLoginMutation and
  //  enter to email not activated and redirect to /send-email-verify
});
