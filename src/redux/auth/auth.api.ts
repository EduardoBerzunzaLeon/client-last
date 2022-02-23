// eslint-disable-next-line import/no-cycle
import { tutorApi } from '../services/tutorApi';

import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  SignInSocialRequest,
  UserResponse,
} from '../../interfaces/api';

export const authApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signInWithSocial: builder.mutation<UserResponse, SignInSocialRequest>({
      query: ({ socialName, ...body }) => ({
        url: `users/${socialName}`,
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<UserResponse, RegisterRequest>({
      query: (newUser) => ({
        url: 'users/signup',
        method: 'POST',
        body: newUser,
      }),
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
    }),
  }),
  overrideExisting: false,
});

export const
  {
    useLoginMutation,
    useSignInWithSocialMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useEmailVerifyMutation,
    useSendEmailVerifyMutation,
    useRenewTokenMutation,
  } = authApi;
