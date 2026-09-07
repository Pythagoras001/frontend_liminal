export interface SurvivalClassAccent {
  /** Color del número y de las etiquetas de estado. */
  accent: string
  /** Color del título al pasar el cursor sobre la fila. */
  hoverTitle: string
}

/**
 * Acento único del catálogo. Las clases ya no se tiñen según su número: todas
 * comparten este color neutro.
 */
export const DEFAULT_ACCENT: SurvivalClassAccent = {
  accent: 'text-zinc-400',
  hoverTitle: 'group-hover:text-white',
}

/** Dígito de la escala numérica ("CLASE 3" -> "3"; "SIN ESCALA" -> ""). */
export function getClassDigit(classNumber: string): string {
  return classNumber.replace(/\D/g, '')
}
