import { ApiClient } from '@/services/ApiClient'
import type { PaginatedResponse } from '@/features/shared/model/PaginatedResponse'
import type { Report } from '@/features/report/model/Report'

export const ReportApi = {
  async findAll(page?: number): Promise<PaginatedResponse<Report>> {
    const { data } = await ApiClient.get<PaginatedResponse<Report>>('/report', {
      params: { page },
    })

    return data
  },
}
