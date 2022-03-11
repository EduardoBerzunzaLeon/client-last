import { rest } from 'msw';
import { RegisterRequest } from '../../../interfaces/api';
import { userLogged } from '../testData/fakeAuthData';
import { generateError } from '../testData/fakeUtilsData';

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

export default {
  mockLoginError,
  mockLoginSuccess,
  mockRegister,
};
