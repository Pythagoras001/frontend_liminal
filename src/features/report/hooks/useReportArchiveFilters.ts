import { computed, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'
import type { Report } from '@/features/report/model/Report'

/** Normaliza para que la búsqueda ignore mayúsculas y tildes. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

function matchesQuery(report: Report, query: string): boolean {
  return (
    normalize(report.description).includes(query) ||
    normalize(report.nivel).includes(query) ||
    normalize(report.levelClass.classNumber).includes(query)
  )
}

/**
 * Búsqueda del listado de reportes. Opera sobre la página ya recibida del
 * servidor: no cambia de página ni vuelve a pedir datos, solo filtra lo que
 * está a la vista.
 */
export function useReportArchiveFilters(reports: MaybeRefOrGetter<Report[]>) {
  const searchQuery = shallowRef('')

  const visibleReports = computed(() => {
    const query = normalize(searchQuery.value.trim())
    return query ? toValue(reports).filter((r) => matchesQuery(r, query)) : toValue(reports)
  })

  return {
    searchQuery,
    visibleReports,
  }
}
