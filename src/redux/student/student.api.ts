import { tutorApi } from '../services/tutor.api';
import {
  StudentResume,
  ListResponse,
} from '../../interfaces/api';

import { providesList } from '../services/response.service';

const providesListStudent = providesList('Students');

export const studentApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<ListResponse<StudentResume>, string>({
      query: (path) => path,
      providesTags: providesListStudent,
    }),
  }),
});

export const {
  useGetStudentsQuery,
} = studentApi;
