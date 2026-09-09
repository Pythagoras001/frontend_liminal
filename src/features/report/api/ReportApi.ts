import { ApiClient } from '@/services/ApiClient'
import type { PaginatedResponse } from '@/features/shared/model/PaginatedResponse'
import type { Report } from '@/features/report/model/Report'
import type { NewReportDraft } from '@/features/report/model/NewReportDraft'
import type { UpdateReportPayload } from '@/features/report/model/EditReportDraft'

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

  async findByAuthor(page?: number): Promise<PaginatedResponse<Report>> {
    const { data } = await ApiClient.get<PaginatedResponse<Report>>('/report/me', {
      params: { page },
    })

    return data
  },

  async findById(id: number): Promise<Report> {
    const { data } = await ApiClient.get<Report>(`/report/${id}`)

    return data
  },

  async rate(reportId: number, liked: boolean): Promise<Report> {
    const { data } = await ApiClient.patch<Report>('/report', { reportId, liked })

    return data
  },

  async remove(id: number): Promise<void> {
    await ApiClient.delete(`/report/${id}`)
  },

  async update(id: number, payload: UpdateReportPayload): Promise<Report> {
    const { data } = await ApiClient.patch<Report>(`/report/${id}`, payload)

    return data
  },

  async create(draft: NewReportDraft): Promise<Report> {
    const { data } = await ApiClient.post<Report>('/report', toFormData(draft), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  },
}
