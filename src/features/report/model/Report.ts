import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import type { Author } from './Author'
import type { Evidence } from './Evidence'

export interface Report {
  id: number
  nivel: string
  description: string
  createdAt: string
  likesCount: number
  principalEvidence: Evidence
  galeryEvidences?: Evidence[]
  author: Author
  levelClass: LevelClass
}
