import { invalidatesList, providesList } from '../services/response.service';

import {
  User,
  UserSingleResponse,
  ListResponse,
  UpdatePasswordAdminRequest,
  UpdateUserRequest,
  UpdateBlockedAdminRequest,
} from '../../interfaces';

import { tutorApi } from '../services/tutor.api';

const providesListUser = providesList('Users');
const invalidatesListUsers = invalidatesList('Users');

export const userApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserSingleResponse, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    getUsers: builder.query<ListResponse<User>, string>({
      query: (path) => path,
      providesTags: providesListUser,
    }),
    updateUser: builder.mutation<UserSingleResponse, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListUsers,
    }),
    updatePasswordUserAdmin: builder.mutation<UserSingleResponse, UpdatePasswordAdminRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/password`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListUsers,
    }),
    updateBlockedUserAdmin: builder.mutation<UserSingleResponse, UpdateBlockedAdminRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/blocked`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListUsers,
    }),
    updateUserAdmin: builder.mutation<UserSingleResponse, FormData>({
      query: (patch) => {
        const id = patch.get('id') || '';

        return {
          url: `users/${id}/admin`,
          method: 'PATCH',
          body: patch,
        };
      },
      invalidatesTags: invalidatesListUsers,
    }),
    createUser: builder.mutation<UserSingleResponse, FormData>({
      query: (post) => ({
        url: 'users/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'Users' ],
    }),
    uploadAvatar: builder.mutation<UserSingleResponse, FormData>({
      query: (body) => ({
        url: 'users/avatar',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [ 'Users' ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUpdateUserAdminMutation,
  useCreateUserMutation,
  useUpdatePasswordUserAdminMutation,
  useUpdateBlockedUserAdminMutation,
} = userApi;
