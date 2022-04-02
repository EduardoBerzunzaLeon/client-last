export type { genericResponse, responseRTK, responsArrayRTK } from './responses/genericInterface';

export type { Error, ErrorResponse } from './responses/errorInterface';

export type {
  User, UserResponse, UsersResponse, ForgotPasswordResponse, UserSingleResponse,
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
