export type { Error, ErrorResponse } from './responses/errorInterface';
export type {
  User, UserResponse, ForgotPasswordResponse,
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

export type { UpdateUserRequest } from './requests/userInterface';
