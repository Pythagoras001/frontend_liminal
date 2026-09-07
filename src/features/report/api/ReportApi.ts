import { ApiClient } from '@/services/ApiClient'
import type { PaginatedResponse } from '@/features/shared/model/PaginatedResponse'
import type { Report } from '@/features/report/model/Report'
import type { NewReportDraft } from '@/features/report/model/NewReportDraft'

/**
 * Traduce el borrador del formulario al `multipart/form-data` que espera el
 * servidor: los ficheros y sus descripciones viajan en campos paralelos
 * (`galeryEvidences` / `galeryEvidencesDescriptions`), repetidos en el mismo
 * orden, uno por evidencia de la galería.
 */
function toFormData(draft: NewReportDraft): FormData {
  const formData = new FormData()

  formData.append('title', draft.title)
  formData.append('nivel', draft.nivel)
  formData.append('description', draft.description)
  formData.append('principalEvidenceDescription', draft.principalEvidenceDescription)

  if (draft.levelClassId !== null) {
    formData.append('levelClassId', String(draft.levelClassId))
  }

  if (draft.principalEvidence) {
    formData.append('principalEvidence', draft.principalEvidence)
  }

  for (const evidence of draft.galeryEvidences) {
    formData.append('galeryEvidences', evidence.file)
    formData.append('galeryEvidencesDescriptions', evidence.description)
  }

  return formData
}

export const ReportApi = {
  async findAll(page?: number): Promise<PaginatedResponse<Report>> {
    const { data } = await ApiClient.get<PaginatedResponse<Report>>('/report', {
      params: { page },
    })

    return data
  },

  async create(draft: NewReportDraft): Promise<Report> {
    // Sin esta cabecera Axios convertiría el `FormData` a JSON, porque la
    // instancia declara `application/json` por defecto. El navegador la
    // reemplaza después por la suya, ya con el `boundary`.
    const { data } = await ApiClient.post<Report>('/report', toFormData(draft), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  },
}
