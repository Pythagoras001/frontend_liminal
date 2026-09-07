import type { Image } from '@/features/shared/model/Image'

export interface LevelClass {
  id: number
  type: string
  classNumber: string
  securityLevel: string
  legitimacy: string
  dangerLevel: string
  description: string
  iconImage: Image
}
