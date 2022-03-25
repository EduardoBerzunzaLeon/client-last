import { Name } from './authInterface';

export interface UpdateUserRequest {
    id: string,
    name: Name,
    gender: string
}

export interface UpdateAvatarRequest {
    avatar: File
}
