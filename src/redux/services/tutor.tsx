// Need to use the React-specific entry point to import createApi
// import {
//   createApi, fetchBaseQuery, BaseQueryFn, FetchArgs,
// } from '@reduxjs/toolkit/query/react';
import {
  BaseQueryFn,
  createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

export interface User {
  email: string,
  gender: string,
  role: string,
  avatar: string
}

export interface UserResponse {
  data: User,
  token: string,
  status: string
}

export interface LoginRequest {
  email: string,
  password: string
}

interface Error {
  isOperational: boolean,
  statusCode: number,
  status: string,
  message: string,
  stack?: string
}

export interface ErrorResponse {
  status: number,
  data: { status: string, error: Error }
}

// : BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>
// Define a service using a base URL and expected endpoints
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = tutorApi;
