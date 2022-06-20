import { tutorApi } from '../services/tutor.api';
import {
  StudentResume,
  ListResponse,
  SingleResponse,
  StudentProfessorInHistory,
  RequestAddProfessorInHistory,
  RequestUpdateProfessorInHistory,
  RequestDeleteProfessorInHistory,
} from '../../interfaces/api';

import { invalidatesList, providesList } from '../services/response.service';
import { EmptyResponse } from '../../interfaces/api/responses/genericInterface';

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
    getProfessorsHistory: builder.query<SingleResponse<StudentProfessorInHistory>, string>({
      query: (id) => ({
        url: `students/${id}/professors`,
        method: 'GET',
      }),
    }),
    createProfessorInHistory: builder.mutation<EmptyResponse, RequestAddProfessorInHistory>({
      query: ({ userId, ...body }) => ({
        url: `students/${userId}/professors`,
        method: 'POST',
        body,
      }),
    }),
    updateProfessorInHistory: builder.mutation<EmptyResponse, RequestUpdateProfessorInHistory>({
      query: ({ userId, professorHistoryId, ...patch }) => ({
        url: `students/${userId}/professors/${professorHistoryId}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteProfessorInHistory: builder.mutation<EmptyResponse, RequestDeleteProfessorInHistory>({
      query: ({ userId, professorHistoryId }) => ({
        url: `students/${userId}/professors/${professorHistoryId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetProfessorsHistoryQuery,
  useCreateProfessorInHistoryMutation,
  useUpdateProfessorInHistoryMutation,
  useDeleteProfessorInHistoryMutation,
} = studentApi;
