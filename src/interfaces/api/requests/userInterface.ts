import { User } from '../responses/userInterface';
import { Name } from './authInterface';

export interface UpdateUserRequest {
    id: string,
    name: Name,
    gender: string,
    email: string
}

export interface UpdateAvatarRequest {
    avatar: File
}

export type CreateUserRequest = Omit<User, 'id' | 'fullname' | 'active'>;
export type UpdateUserAdminRequest = Omit<User, 'fullname' | 'active'>;
