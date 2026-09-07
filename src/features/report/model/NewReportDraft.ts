/**
 * Borrador del formulario de creación de reporte. Es la forma que maneja la
 * interfaz, no la que viaja al servidor: las imágenes son ficheros locales que
 * habrá que subir (probablemente como `multipart/form-data`) antes de crear el
 * reporte.
 */
export interface NewReportDraft {
  /** Título del hallazgo; acaba siendo `Report.description`. */
  title: string
  /** Identificador del nivel explorado, ej. "0". */
  nivel: string
  /** Identificador de la clase de supervivencia seleccionada. */
  levelClassId: number | null
  /** Relato del hallazgo; acaba siendo `Report.findingLog`. */
  description: string
  /** Fotografía principal del reporte. */
  principalEvidence: File | null
  /** Pie de foto de la evidencia principal. */
  principalEvidenceCaption: string
  /** Imágenes adicionales de la galería del reporte. */
  galleryEvidences: File[]
}

export function createEmptyReportDraft(): NewReportDraft {
  return {
    title: '',
    nivel: '',
    levelClassId: null,
    description: '',
    principalEvidence: null,
    principalEvidenceCaption: '',
    galleryEvidences: [],
  }
}
