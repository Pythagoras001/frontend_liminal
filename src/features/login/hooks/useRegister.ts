import { useMutation } from '@tanstack/vue-query'
import { AuthApi } from '@/features/login/api/AuthApi'
import type { RegisterCredentials } from '@/features/login/model/AuthCredentials'

/**
 * Crea la cuenta del explorador. No abre sesión ni guarda token: tras
 * registrarse hay que iniciar sesión, así que quien lo llame debe llevar al
 * usuario a la pestaña de acceso.
 *
 * Aquí se traduce la forma del formulario a la que espera el backend:
 * `explorerName` viaja como `userName` y `confirmPassword` se queda fuera.
 */
export function useRegister() {
  return useMutation({
    mutationFn: ({ explorerName, email, password }: RegisterCredentials) =>
      AuthApi.register({ userName: explorerName, email, password }),
  })
}
