import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { AuthApi } from '@/features/login/api/AuthApi'
import { useAuthStore } from '@/features/login/stores/useAuthStore'
import type { LoginCredentials } from '@/features/login/model/AuthCredentials'


export function useLogin() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthApi.login(credentials),
    onSuccess: ({ access_token: accessToken }) => {
      queryClient.clear()
      authStore.setSession(accessToken)
    },
  })
}
