/**
 * Un nivel del archivo LIMINAL, tal como se muestra en el panel de
 * información activa y en las tarjetas del carrusel "Otros niveles"
 * de la pantalla Home.
 */
export interface Nivel {
  /** Identificador único y estable para v-for / selección. */
  id: string
  /** Índice de archivo mostrado en grande, ej. "01". */
  numero: string
  /** Nombre corto del nivel, ej. "Nivel 1". */
  nombre: string
  /** Descripción corta del nivel, ej. "Zona habitable". */
  subtitulo: string
  /** Clasificación de riesgo, ej. "CLASE 1". */
  clase: string
  /** Estado de estabilidad, ej. "ESTABLE". */
  estado: string
  /** Densidad de entidades, ej. "ENTIDADES ESCASAS". */
  entidades: string
  /** Materiales / composición del entorno, ej. ["Hormigón", "Humedad"]. */
  materiales: string[]
  /** Etiquetas de estado mostradas como badges, ej. ["SEGURO", "ACTIVO"]. */
  badges: string[]
  /** Marca si este es el archivo actualmente activo/destacado. */
  activo: boolean
  /** Imagen de fondo a pantalla completa usada en el hero del nivel. */
  imgFondo: string
  /** Imagen de la tarjeta de exploración usada en el carrusel de niveles. */
  imgCardExpo: string
}
