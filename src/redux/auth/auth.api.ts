import { tutorApi } from '../services/tutorApi';

import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  UserResponse,
} from '../../interfaces/api';

const transformResponseToken = (response: UserResponse) => {
  localStorage.setItem('token', response.token);
  localStorage.setItem('token-init-date', `${new Date().getTime()}`);
  return response;
};

const authApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: transformResponseToken,
    }),
    signUp: builder.mutation<UserResponse, RegisterRequest>({
      query: (newUser) => ({
        url: 'users/signup',
        method: 'POST',
        body: newUser,
      }),
      transformResponse: transformResponseToken,
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: 'users/forgotPassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ 'User' ],
    }),
    resetPassword: builder.mutation<UserResponse, ResetPasswordRequest>({
      query: ({ token, ...body }) => ({
        url: `users/resetPassword/${token}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: transformResponseToken,
      invalidatesTags: [ 'User' ],
    }),
    emailVerify: builder.mutation<UserResponse, string>({
      query: (id) => ({
        url: `users/activate/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: [ 'User' ],
    }),
    sendEmailVerify: builder.mutation<UserResponse, SendEmailVerifyRequest>({
      query: (body) => ({
        url: 'users/sendEmailVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ 'User' ],
    }),
    renewToken: builder.mutation<UserResponse, void>({
      query: () => ({
        url: 'users/renew',
        method: 'POST',
      }),
      invalidatesTags: [ 'User' ],
      transformResponse: transformResponseToken,
    }),
  }),
  overrideExisting: false,
});

export const
  {
    useLoginMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useEmailVerifyMutation,
    useSendEmailVerifyMutation,
    useRenewTokenMutation,
  } = authApi;
