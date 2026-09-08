import { ApiClient } from '@/services/ApiClient'
import type { AuthUser } from '@/features/login/model/AuthUser'
import type { EditProfileDraft } from '@/features/profile/model/EditProfileDraft'

/**
 * Traduce el borrador del modal al `multipart/form-data` que espera el
 * servidor. El avatar solo viaja si el explorador eligió una imagen nueva: sin
 * ese campo el back conserva la fotografía actual.
 */
function toFormData(draft: EditProfileDraft): FormData {
  const formData = new FormData()

  formData.append('userName', draft.userName)
  formData.append('email', draft.email)

  if (draft.avatar) {
    formData.append('avatar', draft.avatar)
  }

  return formData
}

export const ProfileApi = {
  /**
   * Actualiza el perfil de la sesión activa. No recibe el id del usuario: el
   * servidor lo saca del token, que el interceptor de `ApiClient` ya adjunta.
   */
  async update(draft: EditProfileDraft): Promise<AuthUser> {
    // Sin esta cabecera Axios convertiría el `FormData` a JSON, porque la
    // instancia declara `application/json` por defecto. El navegador la
    // reemplaza después por la suya, ya con el `boundary`.
    const { data } = await ApiClient.patch<AuthUser>('/user/update', toFormData(draft), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  },
}
