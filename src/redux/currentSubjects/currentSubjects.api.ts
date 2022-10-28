import { tutorApi } from '../services/tutor.api';
import {
  ListResponse,
  SchoolYearErrors,
} from '../../interfaces';
import { providesList } from '../services/response.service';

const providesListSubject = providesList('CurrentSubjects');

export const currentSubjectApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSubjectsErrors: builder.query<ListResponse<SchoolYearErrors>, string>({
      query: (path) => path,
      providesTags: providesListSubject,
    }),
  }),
});

export const {
  useGetCurrentSubjectsErrorsQuery,
} = currentSubjectApi;
