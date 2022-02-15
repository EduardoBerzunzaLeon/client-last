interface Name {
    first: string,
    last: string
  }

export interface LoginRequest {
    email: string,
    password: string
  }

export interface RegisterRequest {
    name: Name,
    url: string
    email: string,
    password: string,
    confirmPassword: string,
    gender: string
  }
