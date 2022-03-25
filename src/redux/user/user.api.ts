// eslint-disable-next-line import/no-cycle
import { tutorApi } from '../services/tutorApi';

import { UserResponse } from '../../interfaces/api';
import { UpdateUserRequest } from '../../interfaces/api/requests/userInterface';

export const userApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<Omit<UserResponse, 'token'>, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation<Omit<UserResponse, 'token'>, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [ 'User', 'Auth' ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
