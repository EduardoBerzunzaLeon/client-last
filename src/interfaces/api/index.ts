export type {
  genericResponse, responseRTK, responsArrayRTK, ListResponse, SingleResponse,
} from './responses/genericInterface';

export type { Error, ErrorResponse } from './responses/errorInterface';

export type {
  User, UserResponse, ForgotPasswordResponse, UserSingleResponse,
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

export type { UpdateUserRequest, UpdateAvatarRequest } from './requests/userInterface';
