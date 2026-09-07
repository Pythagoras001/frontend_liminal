import { computed, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'
import type { Report } from '@/features/report/model/Report'

/** Criterios de ordenación disponibles en la barra de herramientas del archivo. */
export type ReportSortOrder = 'recent' | 'popular'

export interface ReportSortOption {
  value: ReportSortOrder
  label: string
}

export const REPORT_SORT_OPTIONS: ReportSortOption[] = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'popular', label: 'Más valorados' },
]

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
 * Búsqueda y ordenación del listado de reportes. Opera sobre la página ya
 * recibida del servidor: no cambia de página ni vuelve a pedir datos, solo
 * filtra y ordena lo que está a la vista.
 */
export function useReportArchiveFilters(reports: MaybeRefOrGetter<Report[]>) {
  const searchQuery = shallowRef('')
  const sortOrder = shallowRef<ReportSortOrder>('recent')

  const visibleReports = computed(() => {
    const query = normalize(searchQuery.value.trim())
    const filtered = query
      ? toValue(reports).filter((r) => matchesQuery(r, query))
      : [...toValue(reports)]

    return filtered.sort((a, b) =>
      sortOrder.value === 'popular'
        ? b.likesCount - a.likesCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  })

  return {
    searchQuery,
    sortOrder,
    sortOptions: REPORT_SORT_OPTIONS,
    visibleReports,
  }
}
