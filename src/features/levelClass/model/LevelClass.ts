import type { Image } from '@/features/shared/model/Image'

export interface LevelClass {
  id: number
  type: string
  classNumber: string
  securityLevel: string
  legitimacy: string
  dangerLevel: string
  description: string
  iconImage: Image
}

/**
 * Etiqueta del número de clase. La API devuelve solo la escala numérica ("0"),
 * mientras que la interfaz la muestra como "CLASE 0". Los valores sin escala
 * ("SIN ESCALA" y demás textos) se muestran tal cual.
 */
export function getClassNumberLabel(classNumber: string): string {
  const value = classNumber.trim()

  return /^\d+$/.test(value) ? `CLASE ${value}` : value
}
