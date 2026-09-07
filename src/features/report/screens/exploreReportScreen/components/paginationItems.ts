/** Hueco entre bloques de páginas; se dibuja como "…" y no es pulsable. */
export const PAGINATION_GAP = 'gap' as const

export type PaginationItem = number | typeof PAGINATION_GAP

/**
 * Construye la secuencia de páginas del paginador: siempre la primera y la
 * última, una ventana alrededor de la actual y un hueco donde se omiten
 * páginas. Con pocas páginas devuelve todas sin huecos.
 */
export function buildPaginationItems(
  currentPage: number,
  totalPages: number,
  windowSize = 1,
): PaginationItem[] {
  if (totalPages <= 1) {
    return totalPages === 1 ? [1] : []
  }

  const pages = new Set<number>([1, totalPages])
  for (let page = currentPage - windowSize; page <= currentPage + windowSize; page++) {
    if (page >= 1 && page <= totalPages) {
      pages.add(page)
    }
  }

  const ordered = [...pages].sort((a, b) => a - b)
  const items: PaginationItem[] = []

  ordered.forEach((page, index) => {
    const previous = ordered[index - 1]
    if (previous !== undefined && page - previous > 1) {
      items.push(PAGINATION_GAP)
    }
    items.push(page)
  })

  return items
}
