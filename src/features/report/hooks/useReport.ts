import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ReportApi } from '@/features/report/api/ReportApi'
import type { Report } from '@/features/report/model/Report'
import type { UpdateReportPayload } from '@/features/report/model/EditReportDraft'

export function useReport(page: MaybeRefOrGetter<number> = 1) {
  return useQuery({
    queryKey: ['reports', page],
    queryFn: () => ReportApi.findAll(toValue(page)),
  })
}

export function useReportsByAuthor(page: MaybeRefOrGetter<number> = 1) {
  return useQuery({
    queryKey: ['reports', 'me', page],
    queryFn: () => ReportApi.findByAuthor(toValue(page)),
  })
}

export function useReportById(id: MaybeRefOrGetter<number>) {
  const reportId = computed(() => toValue(id))

  return useQuery({
    queryKey: ['report', reportId],
    queryFn: () => ReportApi.findById(reportId.value),
    enabled: computed(() => Number.isFinite(reportId.value)),
  })
}

export function useRateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reportId, liked }: { reportId: number; liked: boolean }) =>
      ReportApi.rate(reportId, liked),
    onSuccess: (report: Report) => {
      queryClient.setQueryData<Report>(['report', report.id], (current) =>
        current ? { ...current, likesCount: report.likesCount } : current,
      )
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

export function useEditReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reportId, payload }: { reportId: number; payload: UpdateReportPayload }) =>
      ReportApi.update(reportId, payload),
    onSuccess: (updated: Report) => {
      queryClient.invalidateQueries({ queryKey: ['report', updated.id] })
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

export function useDeleteReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reportId: number) => ReportApi.remove(reportId),
    onSuccess: (_result, reportId) => {
      queryClient.removeQueries({ queryKey: ['report', reportId] })
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}
