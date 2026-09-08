import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { CURRENT_USER_QUERY_KEY } from '@/features/login/hooks/useCurrentUser'
import { ProfileApi } from '@/features/profile/api/ProfileApi'
import type { AuthUser } from '@/features/login/model/AuthUser'
import type { EditProfileDraft } from '@/features/profile/model/EditProfileDraft'

/**
 * Guarda los cambios del modal de edición de perfil.
 *
 * La respuesta ya trae el perfil actualizado, así que se escribe directamente
 * en la caché en lugar de invalidarla: `useCurrentUser` declara
 * `staleTime: Infinity` y no volvería a pedirlo por su cuenta.
 *
 * Los reportes sí se invalidan porque incrustan al autor (nombre y avatar) y
 * quedarían mostrando los datos antiguos.
 */
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
