import {
  BaseQueryFn,
  createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { ErrorResponse, UserResponse, LoginRequest } from '../../interfaces/api';

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
  }),
});

export const { useLoginMutation } = tutorApi;
