export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  explorerName: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthTab = 'login' | 'register'
