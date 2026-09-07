import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import type { Author } from './Author'
import type { Evidence } from './Evidence'

export interface Report {
  id: number
  nivel: string
  title: string
  description: string
  /**
   * Relato del hallazgo que se muestra en el detalle del reporte, un párrafo
   * por entrada. Opcional: los listados solo necesitan `description`.
   */
  findingLog?: string[]
  createdAt: string
  likesCount: number
  principalEvidence: Evidence
  galeryEvidences?: Evidence[]
  author: Author
  levelClass: LevelClass
}
