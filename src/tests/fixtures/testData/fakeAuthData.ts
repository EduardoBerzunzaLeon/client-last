import { ForgotPasswordRequest, LoginRequest, UserResponse } from '../../../interfaces';

export const userLogged: UserResponse = {
  data: {
    id: '608064aa1d7963091081ab5d',
    email: 'eduardo@gmail.com',
    name: {
      first: 'test',
      last: 'lastTest',
    },
    fullname: 'test lastTest',
    gender: 'M',
    roles: [ 'admin' ],
    avatar: 'https:/url/myimage.jpg',
    active: true,
    blocked: false,
  },
  token: 'fakeToken',
  status: 'success',
};

export const loginFakeData: LoginRequest = {
  email: 'fake_email@gmail.com',
  password: '12345679',
};

export const forgotPasswordFakeData: ForgotPasswordRequest = {
  email: 'fake_email@gmail.com',
  url: 'https://midomain.com/reset-password/fakeToken',
};

export default {
  forgotPasswordFakeData,
  loginFakeData,
  userLogged,
};
