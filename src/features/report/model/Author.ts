import type { Image } from '@/features/shared/model/Image'

export interface Author {
  id: number
  userName: string
  profileImage?: Image
}
