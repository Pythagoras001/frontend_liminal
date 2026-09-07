import type { Image } from '@/features/shared/model/Image'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import { SurvivalClassType } from '@/features/levelClass/model/SurvivalClassType'

/**
 * Mock del catálogo de clases de supervivencia para la pantalla /CLASS.
 * Reproduce el contenido del diseño Stitch "LIMINAL - Clases de Supervivencia"
 * (proyecto 8432011651729206521).
 *
 * Las clases estándar (0 a 5) usan `classNumber` como escala numérica; los tipos
 * especiales no siguen esa escala y se marcan con `SIN ESCALA`.
 */

const SIN_ESCALA = 'SIN ESCALA'

/** Las imágenes mock no tienen variantes por tamaño, así que se reutiliza la misma URL. */
function imagen(url: string): Image {
  return { thumbnailUrl: url, mediumUrl: url, originalUrl: url }
}

const pasilloAmarillo = imagen(
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDvub6h8r3cYezfdCjzViV5gPog6C0V9ovdc2fW762C5JbKX0zbRLWHbc2tHoihVUYjRprEigJ3lCc4Q-k8yFuO6vJCgxD-R1uVBEhPqoxt_Nv2Vk9_ALNz5VJdkFMtalj0WUPUKq-rICXnE1U_597R0PqSPLiVro9WkRHmuMqztUD3LLJrFoaM9qB9eVvEq1Af-nfK54Q2gUBnR20JrwGw9CPhasi0xxRIuRtPNnqgYZArtSHJ5doU',
)
const almacenIndustrial = imagen(
  'https://res.cloudinary.com/covylvlk/image/upload/v1788745606/imagen_2026-09-06_204327683_1.png',
)
const salaAmarilla = imagen(
  'https://res.cloudinary.com/covylvlk/image/upload/v1788745801/imagen_2026-09-06_205000499.png',
)
const piscinas = imagen(
  'https://res.cloudinary.com/covylvlk/image/upload/v1788745065/fondoPoolRoom.jpg',
)
const corredorProfundo = imagen(
  'https://res.cloudinary.com/covylvlk/image/upload/v1788746022/imagen_2026-09-06_205340913.png',
)
const zonaHabitable = imagen(
  'https://res.cloudinary.com/covylvlk/image/upload/v1788745727/imagen_2026-09-06_204846498.png',
)

export const levelClasses: LevelClass[] = [
  {
    id: 1,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 0',
    securityLevel: 'SEGURO',
    legitimacy: 'ASEGURADO',
    dangerLevel: 'SIN ENTIDADES DAÑINAS',
    description:
      'Niveles completamente seguros, sin entidades hostiles ni peligros ambientales. La exploración y la búsqueda de una salida suelen ser sencillas.',
    iconImage: pasilloAmarillo,
  },
  {
    id: 2,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 1',
    securityLevel: 'SEGURIDAD ALTA',
    legitimacy: 'ASEGURADO',
    dangerLevel: 'ENTIDADES ESCASAS',
    description:
      'Niveles mayormente estables con recursos localizables. Pueden aparecer entidades pasivas aisladas, pero la salida sigue siendo identificable sin equipo especializado.',
    iconImage: salaAmarilla,
  },
  {
    id: 3,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 2',
    securityLevel: 'INSEGURA',
    legitimacy: 'PARCIALMENTE ASEGURADO',
    dangerLevel: 'ENTIDADES HOSTILES AISLADAS',
    description:
      'Niveles inestables donde la geometría puede variar entre visitas. Se han documentado entidades hostiles aisladas; no se recomienda explorar en solitario.',
    iconImage: almacenIndustrial,
  },
  {
    id: 4,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 3',
    securityLevel: 'PELIGRO MODERADO',
    legitimacy: 'SIN ASEGURAR',
    dangerLevel: 'ENTIDADES HOSTILES FRECUENTES',
    description:
      'Riesgo sostenido: entidades hostiles frecuentes, escasez de recursos y salidas difíciles de identificar. Requiere equipo y preparación previa.',
    iconImage: piscinas,
  },
  {
    id: 5,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 4',
    securityLevel: 'PELIGRO SEVERO',
    legitimacy: 'SIN ASEGURAR',
    dangerLevel: 'AMENAZA CONSTANTE',
    description:
      'Niveles abiertamente hostiles. La supervivencia depende del equipo, la ruta y el tiempo de exposición. No se recomienda el ingreso sin escolta.',
    iconImage: corredorProfundo,
  },
  {
    id: 6,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 5',
    securityLevel: 'INFESTACIÓN',
    legitimacy: 'ZONA RESTRINGIDA',
    dangerLevel: 'INFESTACIÓN ACTIVA',
    description:
      'Niveles infestados por entidades agresivas en alta densidad. El acceso está restringido: los registros disponibles provienen de expediciones que no regresaron completas.',
    iconImage: zonaHabitable,
  },
  {
    id: 7,
    type: SurvivalClassType.ENVIRONMENTAL,
    classNumber: SIN_ESCALA,
    securityLevel: 'RIESGO AMBIENTAL',
    legitimacy: 'PARCIALMENTE ASEGURADO',
    dangerLevel: 'CONDICIONES EXTREMAS',
    description:
      'El peligro proviene del entorno —atmósfera, temperatura, radiación o inundación— y no de las entidades. El equipo de protección determina el tiempo de permanencia.',
    iconImage: piscinas,
  },
  {
    id: 8,
    type: SurvivalClassType.PSYCHOLOGICAL,
    classNumber: SIN_ESCALA,
    securityLevel: 'RIESGO COGNITIVO',
    legitimacy: 'SIN ASEGURAR',
    dangerLevel: 'ALTERACIONES MENTALES',
    description:
      'La amenaza actúa sobre la percepción y la memoria del explorador. Los registros de estos niveles suelen contradecirse entre sí.',
    iconImage: corredorProfundo,
  },
  {
    id: 9,
    type: SurvivalClassType.COMBINATION,
    classNumber: SIN_ESCALA,
    securityLevel: 'RIESGO MIXTO',
    legitimacy: 'SIN ASEGURAR',
    dangerLevel: 'AMENAZAS SIMULTÁNEAS',
    description:
      'Combina peligros ambientales, entidades y efectos psicológicos en un mismo nivel. La clasificación numérica varía según el sector explorado.',
    iconImage: almacenIndustrial,
  },
  {
    id: 10,
    type: SurvivalClassType.UTOPIAN,
    classNumber: SIN_ESCALA,
    securityLevel: 'APARENTEMENTE SEGURO',
    legitimacy: 'NO VERIFICADO',
    dangerLevel: 'RIESGO ENCUBIERTO',
    description:
      'Niveles habitables y aparentemente benignos. La ausencia de amenazas visibles es, en sí misma, el motivo por el que se documentan con cautela.',
    iconImage: salaAmarilla,
  },
  {
    id: 11,
    type: SurvivalClassType.DYSTOPIAN,
    classNumber: SIN_ESCALA,
    securityLevel: 'HOSTIL',
    legitimacy: 'ZONA RESTRINGIDA',
    dangerLevel: 'ENTORNO DEGRADADO',
    description:
      'Entornos en ruina o colapso donde tanto la estructura como sus ocupantes son hostiles. La permanencia prolongada no está documentada.',
    iconImage: zonaHabitable,
  },
  {
    id: 12,
    type: SurvivalClassType.CHANGING,
    classNumber: SIN_ESCALA,
    securityLevel: 'INESTABLE',
    legitimacy: 'NO VERIFICADO',
    dangerLevel: 'CLASIFICACIÓN VARIABLE',
    description:
      'La clase del nivel cambia con el tiempo, el recorrido o el número de exploradores. Ninguna medición previa garantiza las condiciones actuales.',
    iconImage: pasilloAmarillo,
  },
  {
    id: 13,
    type: SurvivalClassType.UNCLASSIFIED,
    classNumber: SIN_ESCALA,
    securityLevel: 'DESCONOCIDO',
    legitimacy: 'NO VERIFICADO',
    dangerLevel: 'SIN DATOS SUFICIENTES',
    description:
      'Niveles reportados una sola vez o con evidencia insuficiente para asignarles una clase. Permanecen en revisión hasta obtener un segundo registro.',
    iconImage: corredorProfundo,
  },
  {
    id: 14,
    type: SurvivalClassType.OTHER,
    classNumber: SIN_ESCALA,
    securityLevel: 'FUERA DE ESCALA',
    legitimacy: 'NO VERIFICADO',
    dangerLevel: 'FENÓMENO ATÍPICO',
    description:
      'Fenómenos que no encajan en ninguna categoría existente. Se archivan por separado hasta que aparezcan casos comparables.',
    iconImage: almacenIndustrial,
  },
]
