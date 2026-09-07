import { ApiClient } from '@/services/ApiClient'
import type { LoginCredentials } from '@/features/login/model/AuthCredentials'
import type { AuthUser, LoginResponse, RegisterPayload } from '@/features/login/model/AuthUser'

export const AuthApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await ApiClient.post<LoginResponse>('/auth/login', credentials)

    return data
  },

  /**
   * Crea la cuenta. No inicia sesión: el explorador debe autenticarse después,
   * así que la respuesta no se consume.
   */
  async register(payload: RegisterPayload): Promise<void> {
    await ApiClient.post('/user/', payload)
  },

  /**
   * Perfil del usuario de la sesión activa. No recibe el token: el interceptor
   * de `ApiClient` ya adjunta la cabecera `Authorization` en cada petición.
   */
  async me(): Promise<AuthUser> {
    const { data } = await ApiClient.get<AuthUser>('/user/me')

    return data
  },
}
