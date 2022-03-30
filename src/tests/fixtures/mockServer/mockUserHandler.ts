import { rest } from 'msw';
import { UpdateUserRequest } from '../../../interfaces/api';
import { userLogged } from '../testData/fakeAuthData';
import { generateError } from '../testData/fakeUtilsData';

export const mockGetUser = rest.get<string>(
  `${process.env.REACT_APP_API_URL}/users/:id`,
  (req, res, ctx) => {
    if (req.params.id === '123456789') {
      return res(
        ctx.status(200),
        ctx.json(userLogged),
      );
    }

    return res(
      ctx.status(404),
      ctx.json(generateError('Invalid ID.', 404).data),
    );
  },
);

export const mockUpdateUser = rest.patch<UpdateUserRequest>(
  `${process.env.REACT_APP_API_URL}/users/:id`,
  (req, res, ctx) => {
    if (req.params.id === '123456789') {
      return res(
        ctx.status(200),
        ctx.json(req.body),
      );
    }

    return res(
      ctx.status(404),
      ctx.json(generateError('Invalid ID.', 404).data),
    );
  },
);

export const mockUploadAvatar = rest.patch<FormData>(
  `${process.env.REACT_APP_API_URL}/users/avatar`,
  (req, res, ctx) => {
    if (req.body) {
      return res(
        ctx.status(200),
        ctx.json({ data: { avatar: 'avatar.png' }}),
      );
    }
    return res(
      ctx.status(404),
      ctx.json(generateError('El email no existe.', 404).data),
    );
  },
);

export default {
  mockUploadAvatar,
  mockUpdateUser,
  mockGetUser,
};
