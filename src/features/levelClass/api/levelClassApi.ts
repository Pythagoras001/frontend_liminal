import { ApiClient } from '@/services/ApiClient'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'

export const LevelClassApi = {
  async findAll(): Promise<LevelClass[]> {
    const { data } = await ApiClient.get<LevelClass[]>('/class')

    return data
  },
}
