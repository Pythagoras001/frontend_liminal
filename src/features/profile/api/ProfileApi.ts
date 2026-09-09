import { ApiClient } from '@/services/ApiClient'
import type { AuthUser } from '@/features/login/model/AuthUser'
import type { EditProfileDraft } from '@/features/profile/model/EditProfileDraft'

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
  async update(draft: EditProfileDraft): Promise<AuthUser> {
    const { data } = await ApiClient.patch<AuthUser>('/user/update', toFormData(draft), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  },
}
