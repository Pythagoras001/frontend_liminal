import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { AuthApi } from '@/features/login/api/AuthApi'
import { useAuthStore } from '@/features/login/stores/useAuthStore'
import type { LoginCredentials } from '@/features/login/model/AuthCredentials'

/**
 * Inicia sesión y guarda el token. No pide el perfil: al cambiar el token,
 * `useCurrentUser` lo trae por su cuenta gracias a su opción `enabled`.
 */
export function useLogin() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthApi.login(credentials),
    onSuccess: ({ access_token: accessToken }) => {
      // Si quedaban datos de una sesión anterior en esta pestaña, se descartan
      // antes de que arranquen las queries del nuevo usuario.
      queryClient.clear()
      authStore.setSession(accessToken)
    },
  })
}
