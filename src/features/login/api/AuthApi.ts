import { ApiClient } from '@/services/ApiClient'
import type { LoginCredentials } from '@/features/login/model/AuthCredentials'
import type { AuthUser, LoginResponse, RegisterPayload } from '@/features/login/model/AuthUser'

export const AuthApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await ApiClient.post<LoginResponse>('/auth/login', credentials)
    return data
  },

  async register(payload: RegisterPayload): Promise<void> {
    await ApiClient.post('/user/', payload)
  },

  async me(): Promise<AuthUser> {
    const { data } = await ApiClient.get<AuthUser>('/user/me')
    return data
  },
}
