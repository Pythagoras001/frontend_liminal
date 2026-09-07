export interface SurvivalClassAccent {
  /** Color del hexágono y del número (el trazo del SVG usa `currentColor`). */
  accent: string
  /** Color del título al pasar el cursor sobre la fila. */
  hoverTitle: string
}

/**
 * Escala cromática del diseño: del verde (clase 0, segura) al rojo (clase 5,
 * infestación). Las clases se escriben literales para que Tailwind las detecte
 * al escanear el código fuente.
 */
const ACCENTS_BY_CLASS_NUMBER: Record<string, SurvivalClassAccent> = {
  '0': { accent: 'text-emerald-400', hoverTitle: 'group-hover:text-emerald-300' },
  '1': { accent: 'text-emerald-400', hoverTitle: 'group-hover:text-emerald-300' },
  '2': { accent: 'text-yellow-400', hoverTitle: 'group-hover:text-yellow-300' },
  '3': { accent: 'text-orange-400', hoverTitle: 'group-hover:text-orange-300' },
  '4': { accent: 'text-orange-600', hoverTitle: 'group-hover:text-orange-400' },
  '5': { accent: 'text-red-400', hoverTitle: 'group-hover:text-red-300' },
}

const DEFAULT_ACCENT: SurvivalClassAccent = {
  accent: 'text-zinc-400',
  hoverTitle: 'group-hover:text-white',
}

/** Dígito de la escala numérica ("CLASE 3" -> "3"; "SIN ESCALA" -> ""). */
export function getClassDigit(classNumber: string): string {
  return classNumber.replace(/\D/g, '')
}

export function getSurvivalClassAccent(classNumber: string): SurvivalClassAccent {
  return ACCENTS_BY_CLASS_NUMBER[getClassDigit(classNumber)] ?? DEFAULT_ACCENT
}
