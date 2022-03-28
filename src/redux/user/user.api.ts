// eslint-disable-next-line import/no-cycle
import { tutorApi } from '../services/tutorApi';

import { UserSingleResponse } from '../../interfaces/api';
import { UpdateUserRequest } from '../../interfaces/api/requests/userInterface';

export const userApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserSingleResponse, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation<UserSingleResponse, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [ 'User' ],
    }),
    uploadAvatar: builder.mutation<UserSingleResponse, any>({
      query: (body) => ({
        url: 'users/avatar',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [ 'User' ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useUpdateUserMutation, useUploadAvatarMutation } = userApi;
