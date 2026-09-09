import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { CURRENT_USER_QUERY_KEY } from '@/features/login/hooks/useCurrentUser'
import { ProfileApi } from '@/features/profile/api/ProfileApi'
import type { AuthUser } from '@/features/login/model/AuthUser'
import type { EditProfileDraft } from '@/features/profile/model/EditProfileDraft'

export function useEditProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (draft: EditProfileDraft) => ProfileApi.update(draft),
    onSuccess: (user: AuthUser) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user)
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}
