export interface Name {
    first: string,
    last: string
  }

export interface LoginRequest {
    email: string,
    password: string
  }

export interface SignInSocialRequest {
  socialName: string,
  tokenId: string
}

export interface RegisterRequest {
    name: Name,
    url: string
    email: string,
    password: string,
    confirmPassword: string,
    gender: string
  }

export interface ForgotPasswordRequest {
  email: string,
  url: string,
}

export interface SendEmailVerifyRequest {
  email: string,
  url: string,
}

export interface ResetPasswordRequest {
  token: string,
  password: string,
  confirmPassword: string,
}

export interface UpdatePasswordRequest {
  id: string,
  password: string,
  confirmPassword: string,
  currentPassword: string
}
