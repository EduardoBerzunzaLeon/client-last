// eslint-disable-next-line import/no-unresolved
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
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
  StudentsByField,
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
    getStudentsByField: builder.query<ListResponse<StudentsByField>, string>({
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
      invalidatesTags: (result) => {
        const invalidate = invalidatesListProfessorsInHistory(result);
        return [ ...invalidate, 'Students' as TagDescription<'Students'> ];
      },
    }),
    updateProfessorInHistory: builder.mutation<EmptyResponse, RequestUpdateProfessorInHistory>({
      query: ({ userId, professorHistoryId, ...patch }) => ({
        url: `students/${userId}/professors/${professorHistoryId}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result) => {
        const invalidate = invalidatesListProfessorsInHistory(result);
        return [ ...invalidate, 'Students' as TagDescription<'Students'> ];
      },
    }),
    deleteProfessorInHistory: builder.mutation<EmptyResponse, RequestDeleteProfessorInHistory>({
      query: ({ userId, professorHistoryId }) => ({
        url: `students/${userId}/professors/${professorHistoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => {
        const invalidate = invalidatesListProfessorsInHistory(result);
        return [ ...invalidate, 'Students' as TagDescription<'Students'> ];
      },
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentsByExcelQuery,
  useGetStudentsByFieldQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetProfessorsHistoryQuery,
  useCreateProfessorInHistoryMutation,
  useUpdateProfessorInHistoryMutation,
  useDeleteProfessorInHistoryMutation,
} = studentApi;
