import { rest } from 'msw';
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

export default {
  mockLoginError,
  mockLoginSuccess,
};
