const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * Formatea una fecha ISO como tiempo relativo en español, ej. "hace 18 min".
 * Usado en registros de la comunidad donde solo se conoce `createdAt`.
 */
export function formatRelativeTime(iso: string, now: Date = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime()

  if (diffMs < MINUTE) {
    return 'hace instantes'
  }
  if (diffMs < HOUR) {
    const minutes = Math.floor(diffMs / MINUTE)
    return `hace ${minutes} min`
  }
  if (diffMs < DAY) {
    const hours = Math.floor(diffMs / HOUR)
    return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
  }
  const days = Math.floor(diffMs / DAY)
  return `hace ${days} ${days === 1 ? 'día' : 'días'}`
}
