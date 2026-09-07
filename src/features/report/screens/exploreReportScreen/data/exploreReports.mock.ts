import type { Image } from '@/features/shared/model/Image'
import type { PaginatedResponse } from '@/features/shared/model/PaginatedResponse'
import type { Report } from '@/features/report/model/Report'
import { SurvivalClassType } from '@/features/levelClass/model/SurvivalClassType'

/**
 * Mock del archivo comunitario para la pantalla /REPORTS. Reproduce el contenido
 * del diseño Stitch "LIMINAL - Reportes de Exploración" (proyecto
 * 8432011651729206521) con la forma que devolverá `ReportApi.findAll()`.
 *
 * El archivo real está paginado; aquí solo existe la primera página, así que
 * `totalPages` es 1 y `total` coincide con la cantidad de reportes listados.
 */

/** Las imágenes mock no tienen variantes por tamaño, así que se reutiliza la misma URL. */
function imagen(url: string): Image {
  return { thumbnailUrl: url, mediumUrl: url, originalUrl: url }
}

const pasilloAmarillo = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
)
const almacenInundado = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1VxvgLsEmzauC6ZvhaIeLkX-V5O-wz8bqad74fgHpmNSJTFcUag8-Nesndw6cXyRgzSpl9REaPUI61TKDl2B4tEpSDPiSIjAQSNzw1RLmSx7bMTcT5oJQZeZwdGUDYLovqPhnsFrz4nANptIMyB4yxAlDoQGZoXGELujBD093pJOhB8Rcp1gLB4H_zJ2rXBuyjt_ioyzYnCSBkPoc5x-JPIRqpv22ogGNg9SsvIUlilsYKkNCimtHUhdd8',
)
const corredorSumergido = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1UC5VjJsxMfu0LlaNDnmKzf9YMQgkagGXA-zUiO2e_Qs1cFeKh39JdsA8cDhjG87Hc2GuoH6ZrHTHpSznErAILSAoxC6Fat2--QbT79xfyI3gumZbLsZ182bkkdDhzHScFtWLeYjtCUw8Hl_xGY7mUfT773MtSbn2oigNQNVtNOrHN54fyc6KzUXcxmI0IDQI1tPDJuDgSIQWsmFR83wt44PzVx0CZlAiSUP4yUid8qV8W1kiqjV2PIxg',
)
const supermercadoNocturno = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
)
const suburbioInmovil = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1Vn3fAEOWHLZ4ASeSHGbXcCcBjt546Bam2KEqusEhKYf_CtOb0n0Be21Q3Nph7ZQqJHdTEy580Hhuov96foUNCJIXnylUFwm4R1Os0UGLQFfks5G2rJjmqc5NUFKBmiX073GVZ5IvoR8rpocCmfSIXiMJR_H0npCtgc6A0wH_Vd8eTls4ynvf612mOumBg3h9iSHCyfpWomYgKgT7U9KcQvMRo3V2JPH-NBB08Ai4Qgjh9cd9d7fo5BbFI',
)
const estacionamientoSubterraneo = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1Xo669DCr8CfwGoc2ThHD2XfB_OrcaZb4umHAlEtd9caOqTfneVN68Wxje126FVZHwAiJoFLpWfHSiJ4ZQQD7_TJWMkQDkaxMUxBNSu2gcleRzqybNNHPUlhtFh-XEmuzpbVbsKutJ06mHi3qzOiylVK6C3wV5fNZva_qpfovj1eMlzAt13ybcwQC89_2HDXkpojpjao42r_Gly8A5wVPiCcoJj7p_-unprWN8PHPHABrC0pUIlCL-Uqg',
)

const reports: Report[] = [
  {
    id: 9012,
    nivel: '0',
    title: 'Pasillos sin salida en el sector norte',
    description: 'Pasillos sin salida en el sector norte',
    createdAt: '2026-09-07T08:15:00.000Z',
    likesCount: 128,
    principalEvidence: {
      description: 'Tramo del corredor amarillo antes del punto ciego.',
      image: pasilloAmarillo,
    },
    author: { id: 201, userName: 'Nara V.' },
    levelClass: {
      id: 1,
      type: SurvivalClassType.STANDARD,
      classNumber: 'CLASE 1',
      securityLevel: 'SEGURIDAD ALTA',
      legitimacy: 'ASEGURADO',
      dangerLevel: 'ENTIDADES ESCASAS',
      description: 'Corredores estables, iluminación constante y sin entidades registradas.',
      iconImage: pasilloAmarillo,
    },
  },
  {
    id: 9008,
    nivel: '1',
    title: 'Agua bajo las columnas',
    description: 'Agua bajo las columnas',
    createdAt: '2026-09-06T21:40:00.000Z',
    likesCount: 84,
    principalEvidence: {
      description: 'Nivel del agua a la altura del tobillo entre los pilares.',
      image: almacenInundado,
    },
    author: { id: 202, userName: 'Elias R.' },
    levelClass: {
      id: 2,
      type: SurvivalClassType.ENVIRONMENTAL,
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'EN REVISIÓN',
      dangerLevel: 'ENTIDADES OCASIONALES',
      description: 'Estructura húmeda con riesgo de inundación progresiva.',
      iconImage: almacenInundado,
    },
  },
  {
    id: 8997,
    nivel: '37',
    title: 'La piscina que no termina',
    description: 'La piscina que no termina',
    createdAt: '2026-09-06T14:05:00.000Z',
    likesCount: 216,
    principalEvidence: {
      description: 'Corredor sumergido que continúa más allá del alcance de la linterna.',
      image: corredorSumergido,
    },
    author: { id: 203, userName: 'Noah K.' },
    levelClass: {
      id: 1,
      type: SurvivalClassType.STANDARD,
      classNumber: 'CLASE 1',
      securityLevel: 'SEGURIDAD ALTA',
      legitimacy: 'ASEGURADO',
      dangerLevel: 'SIN ENTIDADES DAÑINAS',
      description: 'Ambiente silencioso y estable, sin amenazas documentadas.',
      iconImage: corredorSumergido,
    },
  },
  {
    id: 8964,
    nivel: '18',
    title: 'Luces encendidas después del cierre',
    description: 'Luces encendidas después del cierre',
    createdAt: '2026-09-05T23:12:00.000Z',
    likesCount: 67,
    principalEvidence: {
      description: 'Fluorescentes activos doce horas después del cierre registrado.',
      image: supermercadoNocturno,
    },
    author: { id: 204, userName: 'Iris M.' },
    levelClass: {
      id: 3,
      type: SurvivalClassType.PSYCHOLOGICAL,
      classNumber: 'CLASE 3',
      securityLevel: 'PELIGROSO',
      legitimacy: 'SIN CONFIRMAR',
      dangerLevel: 'ENTIDADES HOSTILES',
      description: 'Desorientación sostenida y pérdida de la noción del tiempo.',
      iconImage: supermercadoNocturno,
    },
  },
  {
    id: 8931,
    nivel: '94',
    title: 'Casas bajo un cielo inmóvil',
    description: 'Casas bajo un cielo inmóvil',
    createdAt: '2026-09-05T10:30:00.000Z',
    likesCount: 143,
    principalEvidence: {
      description: 'El cielo no cambió de posición durante toda la expedición.',
      image: suburbioInmovil,
    },
    author: { id: 205, userName: 'Dante S.' },
    levelClass: {
      id: 2,
      type: SurvivalClassType.DYSTOPIAN,
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'EN REVISIÓN',
      dangerLevel: 'ENTIDADES OCASIONALES',
      description: 'Repetición arquitectónica que dificulta orientarse y salir.',
      iconImage: suburbioInmovil,
    },
  },
  {
    id: 8902,
    nivel: '22',
    title: 'Ecos en el estacionamiento',
    description: 'Ecos en el estacionamiento',
    createdAt: '2026-09-04T18:55:00.000Z',
    likesCount: 51,
    principalEvidence: {
      description: 'Pasos que responden con retraso desde el fondo del nivel -3.',
      image: estacionamientoSubterraneo,
    },
    author: { id: 206, userName: 'Lena A.' },
    levelClass: {
      id: 3,
      type: SurvivalClassType.COMBINATION,
      classNumber: 'CLASE 3',
      securityLevel: 'PELIGROSO',
      legitimacy: 'SIN CONFIRMAR',
      dangerLevel: 'ENTIDADES HOSTILES',
      description: 'Riesgo ambiental y presencia sonora no identificada.',
      iconImage: estacionamientoSubterraneo,
    },
  },
]

export const exploreReportsPage: PaginatedResponse<Report> = {
  data: reports,
  page: 1,
  pageSize: 6,
  total: 6,
  totalPages: 1,
}
