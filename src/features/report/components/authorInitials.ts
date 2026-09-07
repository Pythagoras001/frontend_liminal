import type { Author } from '@/features/report/model/Author'

/**
 * Iniciales mostradas en el avatar de la tarjeta cuando el autor no tiene
 * fotografía de perfil ("Nara V." -> "NV"). El diseño del archivo usa siempre
 * este monograma como identidad mínima del explorador.
 */
export function getAuthorInitials(author: Author): string {
  return author.userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}
