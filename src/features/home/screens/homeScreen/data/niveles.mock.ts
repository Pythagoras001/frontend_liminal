import type { Nivel } from './types'

/**
 * Mock de niveles del archivo LIMINAL para la sección hero de Home.
 * Las imágenes provienen de los assets generados en el diseño Stitch
 * "LIMINAL - Home Contenido V2" (proyecto 8432011651729206521).
 */
export const niveles: Nivel[] = [
  {
    id: 'nivel-0',
    numero: '00',
    nombre: 'Nivel 0',
    subtitulo: 'Sala amarilla',
    clase: 'CLASE 1',
    estado: 'ESTABLE',
    entidades: 'ENTIDADES ESCASAS',
    materiales: ['Alfombra amarilla', 'Papel tapiz', 'Zumbido eléctrico'],
    badges: ['SEGURO', 'ESTABLE', 'ACTIVO'],
    activo: false,
    imgFondo:
      'https://res.cloudinary.com/covylvlk/image/upload/v1788745801/imagen_2026-09-06_205000499.png',
    imgCardExpo:
      'https://res.cloudinary.com/covylvlk/image/upload/v1788746022/imagen_2026-09-06_205340913.png',
  },
  {
    id: 'nivel-1',
    numero: '01',
    nombre: 'Nivel 1',
    subtitulo: 'Zona habitable',
    clase: 'CLASE 1',
    estado: 'ESTABLE',
    entidades: 'ENTIDADES ESCASAS',
    materiales: ['Almacén industrial', 'Hormigón', 'Humedad'],
    badges: ['SEGURO', 'ESTABLE', 'HÚMEDO', 'ACTIVO'],
    activo: true,
    imgFondo:
      'https://res.cloudinary.com/covylvlk/image/upload/v1788745606/imagen_2026-09-06_204327683_1.png',
    imgCardExpo:
      'https://res.cloudinary.com/covylvlk/image/upload/v1788745727/imagen_2026-09-06_204846498.png',
  },
  {
    id: 'nivel-37',
    numero: '02',
    nombre: 'Nivel 37',
    subtitulo: 'Piscinas',
    clase: 'CLASE 2',
    estado: 'INESTABLE',
    entidades: 'ENTIDADES DESCONOCIDAS',
    materiales: ['Azulejo húmedo', 'Cloro', 'Eco constante'],
    badges: ['INESTABLE', 'HÚMEDO'],
    activo: false,
    imgFondo: 'https://res.cloudinary.com/covylvlk/image/upload/v1788745065/fondoPoolRoom.jpg',
    imgCardExpo:
      'https://lh3.googleusercontent.com/aida/AEtjO1VMlZbEP9P_oaCG-zitIPqyFH4pt2-48xQtNoFBDXatwv40WYPoXIV3-5Pf81iI6n9jutaPaldBHqZvN3ETfhn6xWEO6_RmzoZroQfJhJsXgo8yjTb5gP_R9R3aYMVSmlvjZ4ojTpuTyKMPEFFJIMQNAahlH24obw_rfoqBHGNq6oqOgkeeG25tJn7ZMgF75109gPqMwiQ6sTE7qI4X8UmryVNe9w1CA-I5WJuSKhjqHrQzCLMJcixwuVQ',
  },
]
