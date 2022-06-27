import { tutorApi } from '../services/tutor.api';
import {
  CourseProfessor,
  CreateCourseRequest,
  ListResponse,
  SingleResponse,
  UpdateCourseRequest,
} from '../../interfaces';
import { invalidatesList, providesList } from '../services/response.service';

const providesListCourse = providesList('Courses');
const invalidatesListCourses = invalidatesList('Courses');

export const CourseApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<SingleResponse<CourseProfessor>, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),
    getCourses: builder.query<ListResponse<CourseProfessor>, string>({
      query: (path) => path,
      providesTags: providesListCourse,
    }),
    updateCourse: builder.mutation<SingleResponse<CourseProfessor>, UpdateCourseRequest>({
      query: ({ id, ...patch }) => ({
        url: `courses/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListCourses,
    }),
    createCourse: builder.mutation<SingleResponse<CourseProfessor>, CreateCourseRequest>({
      query: (post) => ({
        url: 'courses/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [ 'Courses' ],
    }),
    deleteCourse: builder.mutation<SingleResponse<null>, string>({
      query: (id) => ({
        url: `courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Courses' ],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useGetCoursesQuery,
  useUpdateCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} = CourseApi;
