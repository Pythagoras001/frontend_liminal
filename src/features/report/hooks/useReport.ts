import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ReportApi } from '@/features/report/api/ReportApi'
import type { Report } from '@/features/report/model/Report'
import type { PaginatedResponse } from '@/features/shared/model/PaginatedResponse'

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
 * De la respuesta solo se aprovecha `likesCount`: el expediente que devuelve
 * valorar puede venir sin sus relaciones (autor, clase, evidencias) y meterlo
 * entero en la caché dejaría al detalle pintando campos inexistentes. Los
 * listados se invalidan porque cada uno guarda su propia copia del reporte.
 */
export function useRateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reportId, liked }: { reportId: number; liked: boolean }) =>
      ReportApi.rate(reportId, liked),
    onSuccess: (report: Report) => {
      queryClient.setQueryData<Report>(['report', report.id], (current) =>
        current ? { ...current, likesCount: report.likesCount } : current,
      )
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

/**
 * Borra un reporte propio. El servidor decide con el token si quien lo pide es
 * el autor, así que la comprobación que hace la interfaz solo sirve para no
 * ofrecer un botón que iba a fallar.
 *
 * La respuesta llega vacía (`204`), de modo que la caché se ajusta a mano en vez
 * de invalidar: se descarta el detalle y se quita la ficha de las páginas que la
 * tuvieran. El prefijo `['reports']` alcanza a la vez el archivo público
 * (`['reports', page]`) y el personal (`['reports', 'me', page]`).
 *
 * El `total` baja en todas las páginas guardadas, también en las que no
 * contenían el reporte, porque es la cuenta del archivo entero. Lo que no se
 * puede arreglar sin volver a preguntar es el desplazamiento: los reportes que
 * venían detrás siguen en la página en la que se pidieron hasta el próximo
 * fetch.
 */
export function useDeleteReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reportId: number) => ReportApi.remove(reportId),
    onSuccess: (_result, reportId) => {
      queryClient.removeQueries({ queryKey: ['report', reportId] })

      queryClient.setQueriesData<PaginatedResponse<Report>>(
        { queryKey: ['reports'] },
        (archive) => {
          if (!archive) {
            return archive
          }

          const total = Math.max(0, archive.total - 1)

          return {
            ...archive,
            data: archive.data.filter((report) => report.id !== reportId),
            total,
            totalPages:
              archive.pageSize > 0 ? Math.ceil(total / archive.pageSize) : archive.totalPages,
          }
        },
      )
    },
  })
}
