const ARCHIVE_DATE_FORMAT = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

/**
 * Formatea una fecha ISO como sello de archivo, ej. "6 SEP 2026". Se usa en las
 * cabeceras de expediente, donde la fecha exacta importa más que el tiempo
 * relativo que muestran los listados.
 */
export function formatArchiveDate(iso: string): string {
  return ARCHIVE_DATE_FORMAT.format(new Date(iso)).replace(/\./g, '').toUpperCase()
}
