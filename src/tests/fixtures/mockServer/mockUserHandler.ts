import { rest } from 'msw';

import { generateError } from '../testData/fakeUtilsData';
import { UpdateUserRequest } from '../../../interfaces/api';
import { userLogged } from '../testData/fakeAuthData';

export const mockGetUser = rest.get<string>(
  `${process.env.REACT_APP_API_URL}/users/:id`,
  (req, res, ctx) => {
    if (req.params.id === userLogged.data.id) {
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
    if (req.params.id === userLogged.data.id) {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          data: {
            id: '608064aa1d7963091081ab5d',
            name: {
              first: 'Eduardo Jesússs',
              last: 'Berzunza León',
            },
            fullname: 'Eduardo Jesússs Berzunza León',
            gender: 'M',
            email: 'eduardoberzunzal@gmail.com',
            active: true,
            blocked: false,
            role: 'admin',
            avatar: 'http://localhost:4000/img/c58c1b0dc778f206af641e6ebde3e4.png',
          },
        }),
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
