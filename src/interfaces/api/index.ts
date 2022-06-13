export type {
  FilterOptionsProps, Paginator,
} from './requests/paginatorInterface';

export type {
  genericResponse, responseRTK, responsArrayRTK, ListResponse, SingleResponse,
} from './responses/genericInterface';

export type { Error, ErrorResponse } from './responses/errorInterface';

export type {
  User, UserResponse, ForgotPasswordResponse, UserSingleResponse, AllowedRoles,
} from './responses/userInterface';

export type {
  LoginRequest,
  SignInSocialRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  UpdatePasswordRequest,
} from './requests/authInterface';

export type {
  UpdateUserRequest,
  UpdateAvatarRequest,
  CreateUserRequest,
  UpdateUserAdminRequest,
  UpdatePasswordAdminRequest,
  UpdateBlockedAdminRequest,
} from './requests/userInterface';

export type {
  Subject, SubjectDetail, RequiredSubjects, SubjectUnion, SubjectCompleteData,
} from './responses/subjectInterface';

export type { UpdateSubjectRequest, CreateSubjectRequest, UpdateCorrelativeSubjectRequest } from './requests/subjectInterface';

export type {
  Professor,
  ProfessorDetail,
  ProfessorFullName,
  CourseProfessor,
  ProfessorsDataToExcel,
} from './responses/professorInterface';
export type { UpdateActiveProfessor } from './requests/professorInterface';

export type { UpdateCourseRequest, CreateCourseRequest } from './requests/courseInterface';
export type { Course } from './responses/courseinterface';

export type { StudentResume, StudentStatus, StudentProfessor } from './responses/studentInterface';
