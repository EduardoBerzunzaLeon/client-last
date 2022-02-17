import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import {
  ErrorResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  UserResponse,
} from '../../interfaces/api';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export const tutorApi = createApi({
  reducerPath: 'tutorApi',
  baseQuery:
  fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authentication', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs,
    unknown, FetchBaseQueryError | ErrorResponse, {}, FetchBaseQueryMeta>,
  tagTypes: [ 'User' ],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
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
  }),
});

export const
  {
    useLoginMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useEmailVerifyMutation,
    useSendEmailVerifyMutation,
  } = tutorApi;
