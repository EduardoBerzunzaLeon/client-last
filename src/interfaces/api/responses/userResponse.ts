export type AllowedRoles = 'admin' | 'professor' | 'reader' | 'student' | 'mentor';

export interface User {
    id: string,
    email: string,
    name: {
      first: string,
      last: string,
    },
    fullname: string,
    gender: string,
    roles: AllowedRoles[],
    avatar?: string,
    active: boolean,
    blocked: boolean
  }

export interface UserResponse {
    data: User,
    token: string,
    status: string
  }

export interface ForgotPasswordResponse {
    status: string,
    message: string,
    data: { resetUrl: string }
  }

export type UserSingleResponse = Omit<UserResponse, 'token'>;
