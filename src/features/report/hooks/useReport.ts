import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ReportApi } from '@/features/report/api/ReportApi'
import type { Report } from '@/features/report/model/Report'

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

/**
 * Valora un reporte. El toggle lo resuelve el servidor a partir del token, así
 * que la interfaz no lleva la cuenta de si el explorador ya lo había valorado.
 *
 * La respuesta trae el reporte con `likesCount` recalculado, así que se escribe
 * en la caché del detalle sin volver a pedirlo. Los listados sí se invalidan
 * porque cada uno guarda su propia copia del reporte dentro de una página.
 */
export function useRateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reportId, liked }: { reportId: number; liked: boolean }) =>
      ReportApi.rate(reportId, liked),
    onSuccess: (report: Report) => {
      queryClient.setQueryData(['report', report.id], report)
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}
