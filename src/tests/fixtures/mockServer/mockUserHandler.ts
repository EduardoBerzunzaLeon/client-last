import { rest } from 'msw';

import { generateError } from '../testData/fakeUtilsData';
import { UpdateUserRequest } from '../../../interfaces';

const userTesting = {
  data: {
    id: '608064aa1d7963091081ab5d',
    email: 'eduardo@gmail.com',
    name: {
      first: 'test',
      last: 'lastTest',
    },
    fullname: 'test lastTest',
    gender: 'M',
    // TODO: Verify this object beacuse is similar to fakeAuthData
    role: 'Admin',
    roles: [ 'admin', 'mentor' ],
    avatar: 'https:/url/myimage.jpg',
    active: true,
    blocked: false,
  },
  token: 'fakeToken',
  status: 'success',
};

export const mockGetUser = rest.get<string>(
  `${process.env.REACT_APP_API_URL}/users/:id`,
  (req, res, ctx) => {
    if (req.params.id === userTesting.data.id) {
      return res(
        ctx.status(200),
        ctx.json(userTesting),
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
    if (req.params.id === userTesting.data.id) {
      userTesting.data.name.first = req.body.name.first;
      userTesting.data.fullname = `${req.body.name.first} ${req.body.name.last}`;

      return res(
        ctx.status(200),
        ctx.json(userTesting),
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
