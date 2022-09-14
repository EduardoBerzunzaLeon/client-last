import { tutorApi } from '../services/tutor.api';
import {
  SingleResponse,
  SubjectHistoryDetail,
} from '../../interfaces';

// import { providesList } from '../services/response.service';

// const providesListSubjectHistory = providesList('SubjectsHistory');

export const subjectHistoryApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentSubject: builder.query<SingleResponse<SubjectHistoryDetail>, string>({
      query: (id) => `subjects/${id}`,
      providesTags: (result, error, id) => [{ type: 'SubjectsHistory', id }],
    }),
  }),
});

export const {
  useGetStudentSubjectQuery,
} = subjectHistoryApi;
