import { toValue, type MaybeRefOrGetter } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ReportApi } from '@/features/report/api/ReportApi'

export function useReport(page: MaybeRefOrGetter<number> = 1) {
  return useQuery({
    queryKey: ['reports', page],
    queryFn: () => ReportApi.findAll(toValue(page)),
  })
}
