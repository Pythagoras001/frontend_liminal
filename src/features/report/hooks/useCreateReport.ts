import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ReportApi } from '@/features/report/api/ReportApi'
import type { NewReportDraft } from '@/features/report/model/NewReportDraft'


export function useCreateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (draft: NewReportDraft) => ReportApi.create(draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}
