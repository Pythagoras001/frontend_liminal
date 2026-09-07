/**
 * Opciones de los desplegables del formulario, reproducidas del diseño Stitch
 * "LIMINAL - Crear Reporte" (proyecto 8432011651729206521).
 *
 * TODO: sustituir por datos del servidor — las clases ya se pueden pedir con
 * `useLevelClass()` (`GET /class`) y los niveles necesitarán su propio endpoint.
 */

export interface SelectOption {
  value: string
  label: string
}

export const LEVEL_OPTIONS: SelectOption[] = [
  { value: '0', label: 'Nivel 0' },
  { value: '1', label: 'Nivel 1 · Zona habitable' },
  { value: '2', label: 'Nivel 2 · Tuberías humeantes' },
  { value: '3', label: 'Nivel 3 · Central eléctrica' },
  { value: '4', label: 'Nivel 4 · Oficinas vacías' },
  { value: '37', label: 'Nivel 37 · Piscinas' },
]

export const CLASS_OPTIONS: SelectOption[] = [
  { value: '1', label: 'Clase 0 · Seguro' },
  { value: '2', label: 'Clase 1 · Seguro con entidades mínimas' },
  { value: '3', label: 'Clase 2 · Inseguro' },
  { value: '4', label: 'Clase 3 · Inestable' },
  { value: '5', label: 'Clase 4 · Altamente peligroso' },
  { value: '6', label: 'Clase 5 · Mortal / No documentado' },
]

/** Formatos que acepta la carga de evidencias, según el diseño. */
export const ACCEPTED_IMAGE_TYPES = 'image/png, image/jpeg, image/webp'
