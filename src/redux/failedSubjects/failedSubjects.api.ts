import { tutorApi } from '../services/tutor.api';
import {
  ListResponse,
  SchoolYearErrors,
} from '../../interfaces';
import { providesList } from '../services/response.service';

const providesListSubject = providesList('FailedSubjects');

export const failedSubjectApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getFailedSubjectsErrors: builder.query<ListResponse<SchoolYearErrors>, string>({
      query: (path) => path,
      providesTags: providesListSubject,
    }),
  }),
});

export const {
  useGetFailedSubjectsErrorsQuery,
} = failedSubjectApi;
