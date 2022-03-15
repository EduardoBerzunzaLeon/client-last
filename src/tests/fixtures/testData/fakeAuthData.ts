import { ForgotPasswordRequest, LoginRequest, UserResponse } from '../../../interfaces/api';

export const userLogged: UserResponse = {
  data: {
    email: 'eduardo@gmail.com',
    name: {
      first: 'test',
      last: 'lastTest',
    },
    fullname: 'test lastTest',
    gender: 'M',
    role: 'Admin',
    avatar: 'https:/url/myimage.jpg',
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
