import { User } from '../responses/userInterface';
import { Name } from './authInterface';

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
    role: string,
    avatar?: FormData,
    blocked: boolean
  }

export type CreateUserRequest = Omit<User, 'id' | 'fullname' | 'active'>;
