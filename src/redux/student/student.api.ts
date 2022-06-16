import { tutorApi } from '../services/tutor.api';
import {
  StudentResume,
  ListResponse,
  UserSingleResponse,
} from '../../interfaces/api';

import { providesList } from '../services/response.service';

const providesListStudent = providesList('Students');

export const studentApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<ListResponse<StudentResume>, string>({
      query: (path) => path,
      providesTags: providesListStudent,
    }),
    createStudent: builder.mutation<UserSingleResponse, FormData>({
      query: (post) => ({
        url: 'students/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'Students' ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
} = studentApi;
