import { tutorApi } from '../services/tutor.api';
import {
  SingleResponse,
  AcademicCareerComplete,
  GenerateCareer,
  UpdateCareer,
  AcademicCareerExcel,
  ListResponse,
} from '../../interfaces';

export const subjectHistoryApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicCareer: builder.query<SingleResponse<AcademicCareerComplete>, string>({
      query: (userId) => `academicCareer/${userId}`,
      providesTags: (result, error, id) => [{ type: 'AcademicCareer', id }],
    }),
    getAcademicCareerForExcel: builder.query<ListResponse<AcademicCareerExcel>, string>({
      query: (userId) => `academicCareer/${userId}/excel`,
      providesTags: [ 'AcademicCareer' ],
    }),
    generateAcademicCareer: builder
      .mutation<SingleResponse<null>, GenerateCareer>({
        query: ({ userId, ...body }) => ({
          url: `academicCareer/${userId}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [ 'AcademicCareer' ],
      }),
    updateAcademicCareer: builder
      .mutation<SingleResponse<null>, UpdateCareer>({
        query: ({ userId, subjectId, ...body }) => ({
          url: `academicCareer/${userId}/subject/${subjectId}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: [ 'AcademicCareer' ],
      }),
  }),
});

export const {
  useGetAcademicCareerQuery,
  useGetAcademicCareerForExcelQuery,
  useGenerateAcademicCareerMutation,
  useUpdateAcademicCareerMutation,
} = subjectHistoryApi;
