// eslint-disable-next-line import/no-cycle
import { tutorApi } from '../services/tutor.api';
import {
  SingleResponse,
  SchoolYear,
  ListResponse,
  SchoolYearErrors,
} from '../../interfaces';
import { providesList } from '../services/response.service';

const providesListError = providesList('SchoolYearErrors');

export const schoolYearApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchoolYear: builder.query<SingleResponse<SchoolYear>, void>({
      query: () => 'schoolYear/',
      providesTags: [ 'SchoolYear' ],
    }),
    getErrosInSchoolYearFiles: builder.query<ListResponse<SchoolYearErrors>, string>({
      query: (path) => path,
      providesTags: providesListError,
    }),
    generateSchoolYear: builder.mutation<SingleResponse<null>, FormData>({
      query: (body) => ({
        url: 'schoolYear',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error?.status === 401) {
          return [ 'UNAUTHORIZED' ];
        }
        return [ 'SchoolYear' ];
      },
    }),
  }),
});

export const {
  useGetSchoolYearQuery,
  useGetErrosInSchoolYearFilesQuery,
  useGenerateSchoolYearMutation,
} = schoolYearApi;
