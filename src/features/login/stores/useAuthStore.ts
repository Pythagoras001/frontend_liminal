import { computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { clearAuthToken, getAuthToken, setAuthToken } from '@/services/api/authTokenStorage'

/**
 * Estado de sesión. El token vive a la vez en `localStorage` (persistencia:
 * sobrevive a recargar la página) y en este `shallowRef` (reactividad:
 * `localStorage` no la tiene). Este store es el único responsable de mantener
 * ambos en sincronía, así que hay que cambiar el token siempre por aquí.
 */
export const useAuthStore = defineStore('auth', () => {
  const token = shallowRef<string | null>(getAuthToken())

  const isAuthenticated = computed(() => !!token.value)

  function setSession(newToken: string): void {
    setAuthToken(newToken)
    token.value = newToken
  }

  function clearSession(): void {
    clearAuthToken()
    token.value = null
  }

  // Se devuelve todo el estado: lo que no se devuelve no aparece en DevTools ni
  // lo ven los plugins de Pinia.
  return { token, isAuthenticated, setSession, clearSession }
})
