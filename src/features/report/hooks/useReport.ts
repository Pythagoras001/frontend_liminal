import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ReportApi } from '@/features/report/api/ReportApi'

export function useReport(page: MaybeRefOrGetter<number> = 1) {
  return useQuery({
    queryKey: ['reports', page],
    queryFn: () => ReportApi.findAll(toValue(page)),
  })
}

/**
 * Reportes publicados por el usuario autenticado (`/report/me`). La clave se
 * mantiene aparte de la del archivo público para que ambas listas no compartan
 * caché aunque pidan la misma página.
 */
export function useReportsByAuthor(page: MaybeRefOrGetter<number> = 1) {
  return useQuery({
    queryKey: ['reports', 'me', page],
    queryFn: () => ReportApi.findByAuthor(toValue(page)),
  })
}

/**
 * Pide un reporte concreto. La ruta `/reports/:id` entrega el identificador
 * como cadena, así que la pantalla lo convierte antes de pasarlo; la petición
 * espera a que sea un número válido para no llamar al servidor con `NaN`.
 */
export function useReportById(id: MaybeRefOrGetter<number>) {
  const reportId = computed(() => toValue(id))

  return useQuery({
    queryKey: ['report', reportId],
    queryFn: () => ReportApi.findById(reportId.value),
    enabled: computed(() => Number.isFinite(reportId.value)),
  })
}
