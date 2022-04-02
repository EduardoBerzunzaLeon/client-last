import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { ErrorResponse, responsArrayRTK, responseRTK } from '../../interfaces/api';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export const invalidatesList = <R extends responseRTK, T extends string>(tagType: T) => (
  resultsWithIds: R | undefined,
) => [{ type: tagType, id: resultsWithIds?.data.id }];

export const providesList = <R extends responsArrayRTK, T extends string>(
  tagType: T) => (
    resultsWithIds: R | undefined,
  ) => (resultsWithIds
    ? [
      { type: tagType, id: 'LIST' },
      ...resultsWithIds.data.map(({ id }) => ({ type: tagType, id })),
    ]
    : [{ type: tagType, id: 'LIST' }]);

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
  tagTypes: [ 'Auth', 'Users' ],
  endpoints: () => ({}),
});

export default { tutorApi };
