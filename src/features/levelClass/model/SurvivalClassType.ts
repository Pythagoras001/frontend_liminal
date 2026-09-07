export enum SurvivalClassType {
  STANDARD = 'STANDARD',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  PSYCHOLOGICAL = 'PSYCHOLOGICAL',
  COMBINATION = 'COMBINATION',
  UTOPIAN = 'UTOPIAN',
  DYSTOPIAN = 'DYSTOPIAN',
  UNCLASSIFIED = 'UNCLASSIFIED',
  CHANGING = 'CHANGING',
  OTHER = 'OTHER',
}

/** Equivalencia en español de cada tipo de clase de supervivencia. */
export const SURVIVAL_CLASS_TYPE_LABELS: Record<SurvivalClassType, string> = {
  [SurvivalClassType.STANDARD]: 'Estándar',
  [SurvivalClassType.ENVIRONMENTAL]: 'Ambiental',
  [SurvivalClassType.PSYCHOLOGICAL]: 'Psicológica',
  [SurvivalClassType.COMBINATION]: 'Combinada',
  [SurvivalClassType.UTOPIAN]: 'Utópica',
  [SurvivalClassType.DYSTOPIAN]: 'Distópica',
  [SurvivalClassType.UNCLASSIFIED]: 'Sin clasificar',
  [SurvivalClassType.CHANGING]: 'Cambiante',
  [SurvivalClassType.OTHER]: 'Otra',
}

function isSurvivalClassType(value: string): value is SurvivalClassType {
  return value in SURVIVAL_CLASS_TYPE_LABELS
}

/**
 * Devuelve la etiqueta en español del tipo recibido. `LevelClass.type` todavía
 * está tipado como `string`, así que un valor fuera del enum se muestra tal cual
 * en lugar de romper la vista.
 */
export function getSurvivalClassTypeLabel(type: string): string {
  return isSurvivalClassType(type) ? SURVIVAL_CLASS_TYPE_LABELS[type] : type
}

/**
 * Orden de presentación de los tipos en la interfaz: el mismo en el que están
 * declarados en el enum, con las clases estándar en primer lugar.
 */
export const SURVIVAL_CLASS_TYPE_ORDER = Object.keys(
  SURVIVAL_CLASS_TYPE_LABELS,
) as SurvivalClassType[]
