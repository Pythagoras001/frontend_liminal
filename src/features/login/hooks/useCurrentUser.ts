import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { AuthApi } from '@/features/login/api/AuthApi'
import { useAuthStore } from '@/features/login/stores/useAuthStore'

export const CURRENT_USER_QUERY_KEY = ['auth', 'me'] as const

/**
 * Perfil del usuario de la sesión activa.
 *
 * `enabled` es la pieza clave del flujo: la petición no se lanza a mano en
 * ningún sitio, se dispara sola en cuanto existe un token. Eso cubre los dos
 * casos con el mismo código: al iniciar sesión (el token aparece) y al recargar
 * la página (el store nace con el token de `localStorage`).
 */
export function useCurrentUser() {
  const { isAuthenticated } = storeToRefs(useAuthStore())

  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: AuthApi.me,
    enabled: isAuthenticated,
    staleTime: Infinity,
    // Un 401 no se arregla reintentando: el interceptor ya cierra la sesión.
    retry: false,
  })
}
