import { tutorApi } from '../services/tutor.api';
import {
  Paginator,
  ListResponse,
  UpdateCourseRequest,
  SingleResponse,
  CreateCourseRequest,
  CourseProfessor,
} from '../../interfaces/api';
import { transformQueryWithPaginator } from '../services/paginator.service';
import { invalidatesList, providesList } from '../services/response.service';

const providesListCourse = providesList('Courses');
const invalidatesListCourses = invalidatesList('Courses');

export const CourseApi = tutorApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<SingleResponse<CourseProfessor>, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),
    getCourses: builder.query<ListResponse<CourseProfessor>, Paginator>({
      query: transformQueryWithPaginator('courses'),
      providesTags: providesListCourse,
    }),
    updateCourse: builder.mutation<SingleResponse<CourseProfessor>, UpdateCourseRequest>({
      query: ({ id, ...patch }) => ({
        url: `Courses/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: invalidatesListCourses,
    }),
    createCourse: builder.mutation<SingleResponse<CourseProfessor>, CreateCourseRequest>({
      query: (post) => ({
        url: 'Courses/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: invalidatesListCourses,
    }),
    deleteCourse: builder.mutation<SingleResponse<null>, string>({
      query: (id) => ({
        url: `Courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidatesListCourses,
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
