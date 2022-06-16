import { tutorApi } from '../services/tutor.api';
import {
  StudentResume,
  ListResponse,
  SingleResponse,
} from '../../interfaces/api';

import { invalidatesList, providesList } from '../services/response.service';

const providesListStudent = providesList('Students');
const invalidatesListStudents = invalidatesList('Students');

export const studentApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<ListResponse<StudentResume>, string>({
      query: (path) => path,
      providesTags: providesListStudent,
    }),
    createStudent: builder.mutation<SingleResponse<StudentResume>, FormData>({
      query: (post) => ({
        url: 'students/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'Students' ],
    }),
    updateStudent: builder.mutation<SingleResponse<StudentResume>, FormData>({
      query: (patch) => {
        const id = patch.get('id') || '';
        return {
          url: `students/${id}`,
          method: 'PATCH',
          body: patch,
        };
      },
      invalidatesTags: invalidatesListStudents,
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
