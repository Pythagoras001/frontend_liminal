import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { queryClient } from '@/config/queryClient'
import router from '@/router'
import { getAuthToken } from '@/services/api/authTokenStorage'
import { useAuthStore } from '@/features/login/stores/useAuthStore'

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
        // `useAuthStore()` solo puede llamarse aquí dentro: este módulo se
        // importa antes de que `main.ts` instale Pinia, y hacerlo a nivel de
        // módulo lanzaría "getActivePinia() was called but there was no active
        // Pinia".
        useAuthStore().clearSession()

        // Sin esto, el siguiente usuario de la pestaña vería por un instante
        // los datos cacheados del anterior.
        queryClient.clear()

        if (router.currentRoute.value.name !== 'login-register') {
          router.push({ name: 'login-register' })
        }
      }

      return Promise.reject(error)
    },
  )
}
