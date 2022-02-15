export interface User {
    email: string,
    gender: string,
    role: string,
    avatar: string
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
