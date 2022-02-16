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
      query: (email) => ({
        url: 'users/forgotPassword',
        method: 'POST',
        body: email,
      }),
      invalidatesTags: [ 'User' ],
    }),

  }),
});

export const { useLoginMutation, useSignUpMutation, useForgotPasswordMutation } = tutorApi;
