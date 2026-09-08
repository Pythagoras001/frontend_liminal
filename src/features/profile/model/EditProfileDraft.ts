import type { AuthUser } from '@/features/login/model/AuthUser'

/**
 * Borrador del modal de edición de perfil. Es la forma que maneja la interfaz,
 * no la que viaja al servidor: `avatar` es el fichero local que el explorador
 * acaba de elegir, porque `PATCH /user/update` lo recibe como
 * `multipart/form-data` bajo ese mismo nombre de campo.
 *
 * Sigue `null` mientras no se cambie la fotografía, de modo que la capa de API
 * pueda omitir el campo y el servidor conserve el avatar actual.
 */
export interface EditProfileDraft {
  userName: string
  email: string
  avatar: File | null
}

/** Rellena el formulario con los datos del explorador autenticado. */
export function createEditProfileDraft(user: AuthUser): EditProfileDraft {
  return {
    userName: user.userName,
    email: user.email,
    avatar: null,
  }
}

/**
 * Indica si el borrador difiere del perfil guardado. Sirve para no enviar una
 * petición que no cambiaría nada.
 */
export function hasProfileChanges(draft: EditProfileDraft, user: AuthUser): boolean {
  return (
    draft.avatar !== null ||
    draft.userName.trim() !== user.userName ||
    draft.email.trim() !== user.email
  )
}
