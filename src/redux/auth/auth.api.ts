// eslint-disable-next-line import/no-cycle
import { tutorApi } from '../services/tutor.api';

import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  SignInSocialRequest,
  UpdatePasswordRequest,
  UserResponse,
} from '../../interfaces';

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
      invalidatesTags: [ 'Auth' ],
    }),
    resetPassword: builder.mutation<UserResponse, ResetPasswordRequest>({
      query: ({ token, ...body }) => ({
        url: `users/resetPassword/${token}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [ 'Auth' ],
    }),
    emailVerify: builder.mutation<UserResponse, string>({
      query: (id) => ({
        url: `users/activate/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: [ 'Auth' ],
    }),
    sendEmailVerify: builder.mutation<UserResponse, SendEmailVerifyRequest>({
      query: (body) => ({
        url: 'users/sendEmailVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ 'Auth' ],
    }),
    renewToken: builder.query<UserResponse, null>({
      query: () => ({
        url: 'users/renew',
        method: 'POST',
      }),
      providesTags: [ 'Auth' ],
    }),
    updatePassword: builder.mutation<UserResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: 'users/me/password',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [ 'Auth' ],
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
    useRenewTokenQuery,
    useUpdatePasswordMutation,
  } = authApi;
