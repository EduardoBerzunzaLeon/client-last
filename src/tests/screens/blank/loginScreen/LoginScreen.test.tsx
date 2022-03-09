import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import LoginScreen from '../../../../screens/blank/loginScreen/LoginScreen';
import { renderWithRouter } from '../../../fixtures/render';

Storage.prototype.setItem = jest.fn();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}/users/slogin`,
    (req, res, ctx) => res(
      // ctx.status(500),
      // ctx.json({ message: 'Internal Server Error' }),
      // ctx.delay(150),

      ctx.json('John Smith'), ctx.delay(150)),
  ),
];

const server = setupServer(...handlers);

describe('<LoginComponent />', () => {
// Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test send form when send empty data show
  // an error and is correctl
  // y data call login redux
  test('should show validation on blur in input', async () => {
    const { getByRole, getByLabelText, getByText } = render(renderWithRouter(LoginScreen, { initialEntries: '/login' }));

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

    // expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  // mock the feth useLoginMutation and
  //  enter to email not activated and redirect to /send-email-verify
});
