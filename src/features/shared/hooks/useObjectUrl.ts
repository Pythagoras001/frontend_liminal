import { onScopeDispose, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue'

/**
 * URL temporal para previsualizar un fichero elegido por el explorador antes de
 * subirlo. Cada `URL.createObjectURL` reserva memoria hasta que se revoca, así
 * que aquí se libera la anterior al cambiar de fichero y también al destruirse
 * el ámbito que llamó al composable.
 */
export function useObjectUrl(file: MaybeRefOrGetter<File | null | undefined>) {
  const url = shallowRef<string>()

  function revoke(): void {
    if (url.value) {
      URL.revokeObjectURL(url.value)
      url.value = undefined
    }
  }

  watch(
    () => toValue(file),
    (current) => {
      revoke()
      if (current) {
        url.value = URL.createObjectURL(current)
      }
    },
    { immediate: true },
  )

  onScopeDispose(revoke)

  return url
}
