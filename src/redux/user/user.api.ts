// eslint-disable-next-line import/no-cycle
import { tutorApi } from '../services/tutorApi';

import { UserResponse } from '../../interfaces/api';

export const userApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<Omit<UserResponse, 'token'>, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery } = userApi;
