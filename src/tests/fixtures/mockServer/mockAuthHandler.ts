import { rest } from 'msw';
import { RegisterRequest } from '../../../interfaces/api';
import { userLogged } from '../testData/fakeAuthData';
import { generateError } from '../testData/fakeUtilsData';
import {
  ForgotPasswordRequest, SendEmailVerifyRequest, ResetPasswordRequest, UpdatePasswordRequest,
} from '../../../interfaces/api/requests/authInterface';

export const mockLoginError = rest.post(
  `${process.env.REACT_APP_API_URL}/users/login`,
  (req, res, ctx) => res(
    ctx.status(401),
    ctx.json(generateError('El correo aun no ha sido activado', 401).data),
  ),
);

export const mockLoginSuccess = rest.post(
  `${process.env.REACT_APP_API_URL}/users/login`,
  (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(userLogged),
  ),
);

export const mockRegister = rest.post<RegisterRequest>(
  `${process.env.REACT_APP_API_URL}/users/signUp`,
  (req, res, ctx) => {
    switch (req.body.email) {
      case 'eduardoberzunzal@gmail.com':
        return res(
          ctx.status(401),
          ctx.json(generateError('El email ya ha sido ocupado.', 401).data),
        );

      default:
        return res(
          ctx.status(200),
          ctx.json(req.body),
        );
    }
  },
);

export const mockForgotPassword = rest.post<ForgotPasswordRequest>(
  `${process.env.REACT_APP_API_URL}/users/forgotPassword`,
  (req, res, ctx) => {
    switch (req.body.email) {
      case 'eduardoberzunzal23@gmail.com':
        return res(
          ctx.status(404),
          ctx.json(generateError('El email no existe.', 404).data),
        );

      default:
        return res(
          ctx.status(200),
          ctx.json(req.body),
        );
    }
  },
);

export const mockSendEmailVerify = rest.post<SendEmailVerifyRequest>(
  `${process.env.REACT_APP_API_URL}/users/sendEmailVerify`,
  (req, res, ctx) => {
    switch (req.body.email) {
      case 'eduardoberzunzal@gmail.com':
        return res(
          ctx.status(200),
          ctx.json(req.body),
        );

      default:
        return res(
          ctx.status(404),
          ctx.json(generateError('El email no existe.', 404).data),
        );
    }
  },
);

export const mockResetPassword = rest.patch<ResetPasswordRequest>(
  `${process.env.REACT_APP_API_URL}/users/resetPassword/:token`,
  (req, res, ctx) => {
    if (req.params.token === 'fake-token') {
      return res(
        ctx.status(200),
        ctx.json(req.body),
      );
    }

    return res(
      ctx.status(404),
      ctx.json(generateError('Error en el token.', 404).data),
    );
  },
);

export const mockEmailVerify = rest.patch<string>(
  `${process.env.REACT_APP_API_URL}/users/activate/:token`,
  (req, res, ctx) => {
    if (req.params.token === '123456789') {
      return res(
        ctx.status(200),
        ctx.json(req.params.token),
      );
    }

    return res(
      ctx.status(404),
      ctx.json(generateError('Error en el token.', 404).data),
    );
  },
);

export const mockUpdatePassword = rest.patch<UpdatePasswordRequest>(
  `${process.env.REACT_APP_API_URL}/users/me/password`,
  (req, res, ctx) => {
    if (req.body.currentPassword === '12345678') {
      return res(
        ctx.status(200),
        ctx.json(req.body),
      );
    }

    return res(
      ctx.status(404),
      ctx.json(generateError('No tiene autorización', 401).data),
    );
  },
);

export default {
  mockLoginError,
  mockLoginSuccess,
  mockRegister,
  mockForgotPassword,
  mockSendEmailVerify,
  mockResetPassword,
  mockEmailVerify,
  mockUpdatePassword,
};
