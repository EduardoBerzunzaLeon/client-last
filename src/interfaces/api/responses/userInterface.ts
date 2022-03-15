export interface User {
    email: string,
    name: {
      first: string,
      last: string,
    },
    fullname: string,
    gender: string,
    role: string,
    avatar: string,
    imagen?: string
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
