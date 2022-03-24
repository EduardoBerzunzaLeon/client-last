import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { ErrorResponse } from '../../interfaces/api';

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
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        const tokenStorage = localStorage.getItem('token') || '';
        if (tokenStorage !== '') {
          headers.set('Authorization', `Bearer ${tokenStorage}`);
        }
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs,
    unknown, FetchBaseQueryError | ErrorResponse, {}, FetchBaseQueryMeta>,
  keepUnusedDataFor: process.env.NODE_ENV !== 'test' ? 60 : 0,
  tagTypes: [ 'Auth', 'User' ],
  endpoints: () => ({}),
});

export default { tutorApi };
