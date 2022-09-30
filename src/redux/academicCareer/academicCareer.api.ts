import { tutorApi } from '../services/tutor.api';
import {
  SingleResponse,
  AcademicCareerTreeData,
} from '../../interfaces';

export const subjectHistoryApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicCareer: builder.query<SingleResponse<AcademicCareerTreeData>, string>({
      query: (userId) => `academicCareer/${userId}`,
      providesTags: (result, error, id) => [{ type: 'AcademicCareer', id }],
    }),
  }),
});

export const {
  useGetAcademicCareerQuery,
} = subjectHistoryApi;
