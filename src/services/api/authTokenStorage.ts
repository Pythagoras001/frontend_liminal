const AUTH_TOKEN_STORAGE_KEY = 'liminal:auth-token'

/**
 * Persistencia del token de sesión en `localStorage`. Vive en su propio módulo
 * para que tanto el interceptor de axios como el store de sesión puedan usarlo
 * sin depender el uno del otro, y para que cambiar de estrategia de
 * almacenamiento (cookie `httpOnly`, memoria, ...) sea un cambio de un archivo.
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}
