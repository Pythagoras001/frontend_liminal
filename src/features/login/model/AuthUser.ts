import type { Image } from '@/features/shared/model/Image'

/** Perfil del explorador autenticado, tal y como lo devuelve `GET /user/me`. */
export interface AuthUser {
  id: number
  userName: string
  email: string
  profileImage?: Image
}

/**
 * Respuesta de `POST /auth/login`: solo el token, el perfil se pide aparte.
 * El nombre del campo respeta el formato del backend (`access_token`).
 */
export interface LoginResponse {
  access_token: string
}

/**
 * Cuerpo de `POST /user/`. El formulario recoge más campos de los que viajan:
 * `confirmPassword` solo sirve para validar en el cliente y `explorerName` se
 * envía como `userName`, que es el nombre que espera el backend.
 */
export interface RegisterPayload {
  userName: string
  email: string
  password: string
}
