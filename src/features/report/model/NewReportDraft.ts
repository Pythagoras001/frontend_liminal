/**
 * Evidencia de la galería tal y como la maneja el formulario: el fichero local
 * junto a su descripción. El servidor las recibe en dos campos paralelos
 * (`galeryEvidences` y `galeryEvidencesDescriptions`), así que la capa de API
 * es la encargada de separar el par al construir el `FormData`.
 */
export interface NewReportEvidenceDraft {
  file: File
  description: string
}

export function createEvidenceDraft(file: File): NewReportEvidenceDraft {
  return { file, description: '' }
}

/**
 * Borrador del formulario de creación de reporte. Es la forma que maneja la
 * interfaz, no la que viaja al servidor: las imágenes son ficheros locales que
 * habrá que enviar como `multipart/form-data`. Los nombres de los campos
 * replican los que espera el back para que la conversión sea directa.
 */
export interface NewReportDraft {
  /** Título del hallazgo; acaba siendo `Report.title`. */
  title: string
  /** Identificador del nivel explorado, ej. "Nivel 0". */
  nivel: string
  /** Identificador de la clase de supervivencia seleccionada. */
  levelClassId: number | null
  /** Relato del hallazgo; acaba siendo `Report.description`. */
  description: string
  /** Fotografía principal del reporte. */
  principalEvidence: File | null
  /** Descripción de la evidencia principal. */
  principalEvidenceDescription: string
  /** Imágenes adicionales del reporte, cada una con su propia descripción. */
  galeryEvidences: NewReportEvidenceDraft[]
}

export function createEmptyReportDraft(): NewReportDraft {
  return {
    title: '',
    nivel: '',
    levelClassId: null,
    description: '',
    principalEvidence: null,
    principalEvidenceDescription: '',
    galeryEvidences: [],
  }
}
