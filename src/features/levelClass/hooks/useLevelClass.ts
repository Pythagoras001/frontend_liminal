import { useQuery } from '@tanstack/vue-query'
import { LevelClassApi } from '@/features/levelClass/api/levelClassApi'

export function useLevelClass() {
  return useQuery({
    queryKey: ['level-classes'],
    queryFn: () => LevelClassApi.findAll(),
  })
}
