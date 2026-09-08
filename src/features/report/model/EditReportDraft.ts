import type { Report } from './Report'

/**
 * Borrador del modal de edición de reporte. Solo recoge los campos de texto del
 * expediente: las evidencias se suben al crearlo y no se retocan desde aquí, así
 * que el borrador no arrastra ficheros y la petición puede viajar como JSON.
 */
export interface EditReportDraft {
  /** Título del hallazgo; acaba siendo `Report.title`. */
  title: string
  /** Identificador del nivel explorado, ej. "Nivel 0". */
  nivel: string
  /** Identificador de la clase de supervivencia seleccionada. */
  levelClassId: number | null
  /** Relato del hallazgo; acaba siendo `Report.description`. */
  description: string
}

/** Rellena el formulario con lo que el expediente tiene guardado. */
export function createEditReportDraft(report: Report): EditReportDraft {
  return {
    title: report.title,
    nivel: report.nivel,
    levelClassId: report.levelClass?.id ?? null,
    description: report.description,
  }
}

/**
 * Cuerpo de `PATCH /report/:id`. El servidor acepta los cuatro campos como
 * opcionales y deja intacto lo que no reciba, así que la interfaz solo manda lo
 * que el explorador tocó. Ninguno admite cadena vacía: el que se envía va con
 * contenido o no se envía.
 */
export interface UpdateReportPayload {
  title?: string
  nivel?: string
  levelClassId?: number
  description?: string
}

/**
 * Reduce el borrador a los campos que difieren del expediente guardado. Un
 * objeto vacío significa que no hay nada que guardar, que es como la interfaz
 * decide si la petición merece la pena.
 */
export function buildReportUpdate(draft: EditReportDraft, report: Report): UpdateReportPayload {
  const payload: UpdateReportPayload = {}

  const title = draft.title.trim()
  if (title !== report.title) {
    payload.title = title
  }

  const nivel = draft.nivel.trim()
  if (nivel !== report.nivel) {
    payload.nivel = nivel
  }

  const description = draft.description.trim()
  if (description !== report.description) {
    payload.description = description
  }

  if (draft.levelClassId !== null && draft.levelClassId !== report.levelClass?.id) {
    payload.levelClassId = draft.levelClassId
  }

  return payload
}

/**
 * Indica si el borrador difiere del expediente guardado. Sirve para no enviar
 * una petición que no cambiaría nada.
 */
export function hasReportChanges(draft: EditReportDraft, report: Report): boolean {
  return Object.keys(buildReportUpdate(draft, report)).length > 0
}
