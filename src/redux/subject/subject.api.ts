import { tutorApi } from '../services/tutor.api';
import {
  CreateSubjectRequest,
  ListResponse,
  Paginator,
  RequiredSubjects,
  SingleResponse,
  Subject,
  SubjectCompleteData,
  SubjectDetail,
  UpdateCorrelativeSubjectRequest,
  UpdateSubjectRequest,
} from '../../interfaces';
import { transformQueryWithPaginator } from '../services/paginator.service';
import { providesList } from '../services/response.service';

const providesListSubject = providesList('Subjects');

export const subjectApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query<SingleResponse<SubjectDetail>, string>({
      query: (id) => `subjects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Subjects', id }],
    }),
    getSubjects: builder.query<ListResponse<Subject>, string>({
      query: (path) => path,
      providesTags: providesListSubject,
    }),
    getConsecutiveSubjects: builder.query<ListResponse<RequiredSubjects>, Paginator>({
      query: transformQueryWithPaginator('subjects'),
      providesTags: providesListSubject,
    }),
    getSubjectsForExcel: builder.query<ListResponse<SubjectCompleteData>, null>({
      query: () => 'subjects/excel',
      providesTags: [ 'Subjects' ],
    }),
    updateSubject: builder.mutation<SingleResponse<Subject>, UpdateSubjectRequest>({
      query: ({ id, ...patch }) => ({
        url: `subjects/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [ 'Subjects' ],
    }),
    updateCorrelativeSubjects: builder.mutation<
      SingleResponse<Subject>,
      UpdateCorrelativeSubjectRequest
      >({
        query: ({ id, ...patch }) => ({
          url: `subjects/${id}/correlative`,
          method: 'PATCH',
          body: patch,
        }),
        invalidatesTags: [ 'Subjects' ],
      }),
    createSubject: builder.mutation<SingleResponse<Subject>, CreateSubjectRequest>({
      query: (post) => ({
        url: 'subjects/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'Subjects' ],
    }),
    deleteSubject: builder.mutation<SingleResponse<null>, string>({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Subjects' ],
    }),
  }),
});

export const {
  useGetSubjectQuery,
  useGetSubjectsQuery,
  useGetSubjectsForExcelQuery,
  useGetConsecutiveSubjectsQuery,
  useUpdateSubjectMutation,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateCorrelativeSubjectsMutation,
} = subjectApi;
