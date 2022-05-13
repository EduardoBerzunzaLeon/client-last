import { tutorApi } from '../services/tutor.api';
import {
  Paginator,
  Subject,
  ListResponse,
  UpdateSubjectRequest,
  SingleResponse,
  CreateSubjectRequest,
  SubjectDetail,
  ConsecutiveSubject,
} from '../../interfaces/api';
import { transformQueryWithPaginator } from '../services/paginator.service';
import { invalidatesList, providesList } from '../services/response.service';

const providesListSubject = providesList('Subjects');
const invalidatesListSubjects = invalidatesList('Subjects');

export const subjectApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query<SingleResponse<SubjectDetail>, string>({
      query: (id) => `subjects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Subjects', id }],
    }),
    getSubjects: builder.query<ListResponse<Subject>, Paginator>({
      query: transformQueryWithPaginator('subjects'),
      providesTags: providesListSubject,
    }),
    getConsecutiveSubjects: builder.query<ListResponse<ConsecutiveSubject>, Paginator>({
      query: transformQueryWithPaginator('subjects'),
      providesTags: providesListSubject,
    }),
    updateSubject: builder.mutation<SingleResponse<Subject>, UpdateSubjectRequest>({
      query: ({ id, ...patch }) => ({
        url: `subjects/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListSubjects,
    }),
    createSubject: builder.mutation<SingleResponse<Subject>, CreateSubjectRequest>({
      query: (post) => ({
        url: 'subjects/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: invalidatesListSubjects,
    }),
    deleteSubject: builder.mutation<SingleResponse<null>, string>({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidatesListSubjects,
    }),
  }),
});

export const {
  useGetSubjectQuery,
  useGetSubjectsQuery,
  useGetConsecutiveSubjectsQuery,
  useUpdateSubjectMutation,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
