import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { ForgotPasswordResponse } from '../../interfaces/api/responses/userInterface';
import { ForgotPasswordRequest } from '../../interfaces/api/requests/authInterface';

import {
  ErrorResponse,
  UserResponse,
  LoginRequest,
  RegisterRequest,
} from '../../interfaces/api';

export const tutorApi = createApi({
  reducerPath: 'tutorApi',
  baseQuery:
  fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }) as BaseQueryFn<string | FetchArgs,
    unknown, FetchBaseQueryError | ErrorResponse, {}, FetchBaseQueryMeta>,
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
      query: (email) => ({
        url: 'users/forgotPassword',
        method: 'POST',
        body: email,
      }),
    }),

  }),
});

export const { useLoginMutation, useSignUpMutation, useForgotPasswordMutation } = tutorApi;
