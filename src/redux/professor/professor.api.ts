import { tutorApi } from '../services/tutor.api';
import {
  Paginator, Professor, ListResponse, SingleResponse, ProfessorDetail,
} from '../../interfaces/api';
import { transformQueryWithPaginator } from '../services/paginator.service';
import { invalidatesList, providesList } from '../services/response.service';

const providesListSubject = providesList('Professors');
const invalidatesListProfessors = invalidatesList('Professors');

export const professorApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfessor: builder.query<SingleResponse<ProfessorDetail>, string>({
      query: (id) => `Professors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Professors', id }],
    }),
    getProfessors: builder.query<ListResponse<Professor>, Paginator>({
      query: transformQueryWithPaginator('Professors'),
      providesTags: providesListSubject,
    }),
    updateProfessor: builder.mutation<SingleResponse<Professor>, FormData>({
      query: (patch) => {
        const id = patch.get('id') || '';

        return {
          url: `Professors/${id}`,
          method: 'PATCH',
          body: patch,
        };
      },
      invalidatesTags: invalidatesListProfessors,
    }),
    createProfessor: builder.mutation<SingleResponse<Professor>, FormData>({
      query: (post) => ({
        url: 'Professors/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: invalidatesListProfessors,
    }),
    deleteProfessor: builder.mutation<SingleResponse<null>, string>({
      query: (id) => ({
        url: `Professors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidatesListProfessors,
    }),
  }),
});

export const {
  useGetProfessorQuery,
  useGetProfessorsQuery,
  useUpdateProfessorMutation,
  useCreateProfessorMutation,
  useDeleteProfessorMutation,
} = professorApi;
