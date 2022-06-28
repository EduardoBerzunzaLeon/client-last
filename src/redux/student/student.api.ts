import { tutorApi } from '../services/tutor.api';
import {
  EmptyResponse,
  ListResponse,
  RequestAddProfessorInHistory,
  RequestDeleteProfessorInHistory,
  RequestUpdateProfessorInHistory,
  SingleResponse,
  StudentByExcel,
  StudentProfessorInHistory,
  StudentResume,
} from '../../interfaces';

import { invalidatesList, providesList } from '../services/response.service';

const providesListStudent = providesList('Students');
const invalidatesListStudents = invalidatesList('Students');
const providesListProfessorInHistory = providesList('ProfessorsInHistory');
const invalidatesListProfessorsInHistory = invalidatesList('ProfessorsInHistory');

export const studentApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<ListResponse<StudentResume>, string>({
      query: (path) => path,
      providesTags: providesListStudent,
    }),
    getStudentsByExcel: builder.query<ListResponse<StudentByExcel>, string>({
      query: (path) => path,
      providesTags: [ 'Students' ],
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
      providesTags: providesListProfessorInHistory,
    }),
    createProfessorInHistory: builder.mutation<EmptyResponse, RequestAddProfessorInHistory>({
      query: ({ userId, ...body }) => ({
        url: `students/${userId}/professors`,
        method: 'POST',
        body,
      }),
      invalidatesTags: invalidatesListProfessorsInHistory,
    }),
    updateProfessorInHistory: builder.mutation<EmptyResponse, RequestUpdateProfessorInHistory>({
      query: ({ userId, professorHistoryId, ...patch }) => ({
        url: `students/${userId}/professors/${professorHistoryId}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListProfessorsInHistory,
    }),
    deleteProfessorInHistory: builder.mutation<EmptyResponse, RequestDeleteProfessorInHistory>({
      query: ({ userId, professorHistoryId }) => ({
        url: `students/${userId}/professors/${professorHistoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidatesListProfessorsInHistory,
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentsByExcelQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetProfessorsHistoryQuery,
  useCreateProfessorInHistoryMutation,
  useUpdateProfessorInHistoryMutation,
  useDeleteProfessorInHistoryMutation,
} = studentApi;
