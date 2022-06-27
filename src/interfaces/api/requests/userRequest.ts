import { AllowedRoles, User } from '../responses/userResponse';
import { Name } from './authRequest';

export interface UpdateUserRequest {
    id: string,
    name: Name,
    gender: string,
    email: string
}

export interface UpdatePasswordAdminRequest {
  id: string,
  password: string,
  confirmPassword: string;
}

export interface UpdateBlockedAdminRequest {
  id: string,
  blocked: boolean
}

export interface UpdateAvatarRequest {
    avatar: File
}

export interface UpdateUserAdminRequest {
    id: string,
    email: string,
    name: {
      first: string,
      last: string,
    },
    gender: string,
    roles: AllowedRoles[],
    avatar?: FormData,
    blocked: boolean
  }

export type CreateUserRequest = Omit<User, 'id' | 'fullname' | 'active'>;
