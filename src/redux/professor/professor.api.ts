import { tutorApi } from '../services/tutor.api';
import {
  Professor,
  ListResponse,
  SingleResponse,
  ProfessorDetail,
  UpdateActiveProfessor,
  ProfessorsDataToExcel,
  Course,
} from '../../interfaces/api';
import { invalidatesList, providesList } from '../services/response.service';

const providesListSubject = providesList('Professors');
const invalidatesListProfessors = invalidatesList('Professors');

export const professorApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfessor: builder.query<SingleResponse<ProfessorDetail>, string>({
      query: (id) => `professors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Professors', id }],
    }),
    getProfessors: builder.query<ListResponse<Professor>, string>({
      query: (path) => path,
      providesTags: providesListSubject,
    }),
    getProfessorsForExcel: builder.query<ListResponse<ProfessorsDataToExcel>, null>({
      query: () => 'professors/excel',
      providesTags: [ 'Subjects' ],
    }),
    getCoursesByProfessor: builder.query<ListResponse<Course>, string>({
      query: (id) => `professors/${id}/courses`,
      providesTags: (result, error, id) => [{ type: 'Professors', id }, 'Courses' ],
    }),
    updateProfessor: builder.mutation<SingleResponse<Professor>, FormData>({
      query: (patch) => {
        const id = patch.get('id') || '';

        return {
          url: `professors/${id}`,
          method: 'PATCH',
          body: patch,
        };
      },
      invalidatesTags: invalidatesListProfessors,
    }),
    updateActive: builder.mutation<SingleResponse<Professor>, UpdateActiveProfessor>({
      query: ({ id, ...patch }) => ({
        url: `professors/${id}/active`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListProfessors,
    }),
    createProfessor: builder.mutation<SingleResponse<Professor>, FormData>({
      query: (post) => ({
        url: 'Professors/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'Professors' ],
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
  useGetCoursesByProfessorQuery,
  useGetProfessorsForExcelQuery,
  useUpdateProfessorMutation,
  useUpdateActiveMutation,
  useCreateProfessorMutation,
  useDeleteProfessorMutation,
} = professorApi;