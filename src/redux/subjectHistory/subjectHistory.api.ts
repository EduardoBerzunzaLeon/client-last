import { tutorApi } from '../services/tutor.api';
import {
  CreateSubjectHistory,
  EmptyResponse,
  ListResponse,
  SingleResponse,
  SubjectHistoryDetail,
  SubjectsStudied,
  GeneralSubject,
  UpdateSubjectHistory,
} from '../../interfaces';

export const subjectHistoryApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentSubject: builder.query<SingleResponse<SubjectHistoryDetail>, string>({
      query: (userId) => `subjectHistory/${userId}`,
      providesTags: (result, error, id) => [{ type: 'SubjectsHistory', id }],
    }),
    getSubjectStudied: builder.query<ListResponse<SubjectsStudied>, string>({
      query: (userId) => `subjectHistory/${userId}/history`,
      providesTags: (result, error, id) => [{ type: 'SubjectsHistory', id }],
    }),
    getUnstudySubject: builder.query<ListResponse<GeneralSubject>, string>({
      query: (userId) => `subjectHistory/${userId}/unstudy`,
      providesTags: (result, error, id) => [{ type: 'SubjectsHistory', id }],
    }),
    getPossibleSubjects: builder.query<ListResponse<GeneralSubject>, string>({
      query: (userId) => `subjectHistory/${userId}/subjects`,
      providesTags: (result, error, id) => [{ type: 'SubjectsHistory', id }],
    }),
    updateSubjectPhase: builder.mutation<EmptyResponse, UpdateSubjectHistory>({
      query: ({ phaseId, ...patch }) => ({
        url: `subjectHistory/${phaseId}/phase`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [ 'SubjectsHistory' ],
    }),
    createSubjectinHistory: builder.mutation<
      EmptyResponse,
      CreateSubjectHistory
    >({
      query: (post) => ({
        url: 'subjectHistory/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'SubjectsHistory' ],
    }),
    deleteSubjectPhase: builder.mutation<EmptyResponse, string>({
      query: (phaseId) => ({
        url: `subjectHistory/${phaseId}/phase`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'SubjectsHistory' ],
    }),
  }),
});

export const {
  useGetStudentSubjectQuery,
  useGetSubjectStudiedQuery,
  useGetUnstudySubjectQuery,
  useGetPossibleSubjectsQuery,
  useUpdateSubjectPhaseMutation,
  useCreateSubjectinHistoryMutation,
  useDeleteSubjectPhaseMutation,
} = subjectHistoryApi;
