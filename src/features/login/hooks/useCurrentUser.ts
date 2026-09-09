import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { AuthApi } from '@/features/login/api/AuthApi'
import { useAuthStore } from '@/features/login/stores/useAuthStore'

export const CURRENT_USER_QUERY_KEY = ['auth', 'me'] as const

export function useCurrentUser() {
  const { isAuthenticated } = storeToRefs(useAuthStore())

  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: AuthApi.me,
    enabled: isAuthenticated,
    staleTime: Infinity,
    retry: false,
  })
}
