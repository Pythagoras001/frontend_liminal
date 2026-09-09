import { useMutation } from '@tanstack/vue-query'
import { AuthApi } from '@/features/login/api/AuthApi'
import type { RegisterCredentials } from '@/features/login/model/AuthCredentials'

export function useRegister() {
  return useMutation({
    mutationFn: ({ explorerName, email, password }: RegisterCredentials) =>
      AuthApi.register({ userName: explorerName, email, password }),
  })
}
