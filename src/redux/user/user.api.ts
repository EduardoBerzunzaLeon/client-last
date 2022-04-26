// eslint-disable-next-line import/no-cycle
import { invalidatesList, providesList, tutorApi } from '../services/tutorApi';
import { User, UserSingleResponse } from '../../interfaces/api';
import { UpdatePasswordAdminRequest, UpdateUserRequest, UpdateBlockedAdminRequest } from '../../interfaces/api/requests/userInterface';
import { ListResponse } from '../../interfaces/api/responses/genericInterface';
import { Generic } from '../../interfaces/generic';

const providesListUser = providesList('Users');
const invalidatesListUsers = invalidatesList('Users');

interface Paginator {
  page: string | void,
  sortField: string | void,
  sortOrder: string | void,
  filters: Generic
  rows?: number,
}

const prepareFilters = (filterOptions: Generic) => Object.keys(filterOptions).map((fieldName) => {
  const f = filterOptions[fieldName];
  // ? Not pass falsy values except boolean false
  if (f.value || f.value === false) {
    let matchMode = '[regex]=';
    if (f.matchMode) {
      switch (f.matchMode) {
        case 'contains':
          matchMode = '[regex]=';
          break;
        case 'equals':
          matchMode = '=';
          break;
        default:
          matchMode = '[regex]=';
          break;
      }
    }
    return `${fieldName}${matchMode}${encodeURIComponent(f.value)}`.replace('.', '_');
  }
  return '';
}).filter(Boolean).join('&');

export const userApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserSingleResponse, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    getUsers: builder.query<ListResponse<User>, Paginator>({
      query: ({
        page = '1', sortField = '', sortOrder = '1', filters, rows = 10,
      }) => `users/?page=${page}&sort=${sortField}&limit=${rows}&sortOrder=${sortOrder}&${prepareFilters(filters)}`,
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
  useUpdateUserAdminMutation,
  useCreateUserMutation,
  useUpdatePasswordUserAdminMutation,
  useUpdateBlockedUserAdminMutation,
} = userApi;
