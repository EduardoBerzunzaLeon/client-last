// eslint-disable-next-line import/no-cycle
import { invalidatesList, providesList, tutorApi } from '../services/tutorApi';
import { UserSingleResponse, UsersResponse } from '../../interfaces/api';
import { UpdateUserRequest } from '../../interfaces/api/requests/userInterface';

const providesListUser = providesList('Users');
const invalidatesListUsers = invalidatesList('Users');

export const userApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserSingleResponse, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    getUsers: builder.query<UsersResponse, void>({
      query: () => 'users',
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
    uploadAvatar: builder.mutation<UserSingleResponse, FormData>({
      query: (body) => ({
        url: 'users/avatar',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: invalidatesListUsers,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} = userApi;
