import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const AUTH_TOKEN_STORAGE_KEY = 'liminal:auth-token'

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}

export function setupAuthInterceptor(client: AxiosInstance): void {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAuthToken()

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearAuthToken()
      }

      return Promise.reject(error)
    },
  )
}
