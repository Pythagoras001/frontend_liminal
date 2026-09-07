import type { Image } from '@/features/shared/model/Image'
import type { PaginatedResponse } from '@/features/shared/model/PaginatedResponse'
import type { Author } from '@/features/report/model/Author'
import type { Report } from '@/features/report/model/Report'
import type { AuthUser } from '@/features/login/model/AuthUser'
import { SurvivalClassType } from '@/features/levelClass/model/SurvivalClassType'

/**
 * Mock del archivo personal para la pantalla /profile. Reproduce el contenido
 * del diseño Stitch "LIMINAL - Perfil de Usuario (USER44)" (proyecto
 * 8432011651729206521) con la forma que devolverá el endpoint de reportes por
 * autor.
 *
 * Solo existe la primera página, así que `totalPages` es 1 y `total` coincide
 * con los reportes listados.
 */

/** Las imágenes mock no tienen variantes por tamaño, así que se reutiliza la misma URL. */
function imagen(url: string): Image {
  return { thumbnailUrl: url, mediumUrl: url, originalUrl: url }
}

const retrato = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1UffwtEY5qidBgRZA1KqKQUfEvxfH4WD39QlHVFwMUEMMdfn-Gqbf_Spy4gAektpRs9fso23RVfAnnfFm5hIlr2SrkKTgkdyfpp8V4bckGgkImvkLvP4Qk1_uRBbD8lejiEzuQBpd2ElB8aO47kQuV3LFVHBBpg6U2FIstGr-R7JXxSm-CNGw0VYt6CRpwqjokIZOLVLHn_Av3i9fA2FD72HYcJ4W_IF3-ebD6EGj5xAb22ywWDvph8ORg',
)
const pasilloAmarillo = retrato
const corredorInundado = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1UkiV832xUpuroIZ9IfbRl60zg5BfMIDzlsAbyp0KTcyfngsklkYXvLr9UGIvbZWJsb4jvugsz9yam3Zejm5Ui48RKGtx8-T6fVZO7WiUEa-lCbjXVZNKgA9RjXDOt4xSTilkIy4wpLsLIEaPZ8pj6wLM_5Rus8dp6a6ohoPIkNWqtDRCD96esFVfqO9BPtpV2vfNKtApNNlYb8UNdanrYhVOwVs2_6oKMeLfJpaV5bkWXaplL8S-jwynM',
)
const corredorSumergido = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1UC5VjJsxMfu0LlaNDnmKzf9YMQgkagGXA-zUiO2e_Qs1cFeKh39JdsA8cDhjG87Hc2GuoH6ZrHTHpSznErAILSAoxC6Fat2--QbT79xfyI3gumZbLsZ182bkkdDhzHScFtWLeYjtCUw8Hl_xGY7mUfT773MtSbn2oigNQNVtNOrHN54fyc6KzUXcxmI0IDQI1tPDJuDgSIQWsmFR83wt44PzVx0CZlAiSUP4yUid8qV8W1kiqjV2PIxg',
)
const salaAmarilla = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1UbgNGsEuJW0yv0yvkURh80LQZ9d8Q97uxmjNYceg_D08LwVH0JJ67XOQkc3dN6AB0g3hPIoYiVZxbLMBac9SNYDnj-FUEip87-YekUz9UL_E2o2UBfIyqMeGswjZ2MIrMa6kCfRdZr0UKZ8b3jWERvKuacXFkVCEOKNm9hFF0abRqASZAV9wV6BaiEIdvyfhrJS_0dIAeECFvvxnJY6RrqoFDAjz74gputszRNgE4kcZkSK9znznha3w',
)
const estacionamiento = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1Xo669DCr8CfwGoc2ThHD2XfB_OrcaZb4umHAlEtd9caOqTfneVN68Wxje126FVZHwAiJoFLpWfHSiJ4ZQQD7_TJWMkQDkaxMUxBNSu2gcleRzqybNNHPUlhtFh-XEmuzpbVbsKutJ06mHi3qzOiylVK6C3wV5fNZva_qpfovj1eMlzAt13ybcwQC89_2HDXkpojpjao42r_Gly8A5wVPiCcoJj7p_-unprWN8PHPHABrC0pUIlCL-Uqg',
)
const institutoNocturno = imagen(
  'https://lh3.googleusercontent.com/aida/AEtjO1W9-grf5pZfenmCluLBNk139eBRfbeo0nMYXNqX9p3bDMzRuUZLhO7sf90uMv0OJp8NAT83JPCvhCNCj991SmBEmOnROM_fqFMdL-0_LkAPBoKYUJmY9NhyinJAYjQcg5b01qkuA3_eLCLaglXej3bqc65Cpkv3bpkIl6OWyLC-f9clMhMXgf4Tw_JrdjzUh3dOKM47CoXYfNN0d4slJDH2WmtlPtpAJ0os7TTVE717XIHktkjymLa9J7A',
)

/**
 * Identidad de respaldo del perfil. La pantalla usa el usuario de la sesión
 * (`useCurrentUser`) cuando existe; este mock permite verla sin backend.
 */
export const profileUser: AuthUser = {
  id: 44,
  userName: 'USER44',
  email: 'user44@liminal.com',
  profileImage: retrato,
}

/** Todos los reportes del archivo personal comparten autor. */
const author: Author = {
  id: profileUser.id,
  userName: profileUser.userName,
  profileImage: profileUser.profileImage,
}

const reports: Report[] = [
  {
    id: 9012,
    nivel: '0',
    title: 'Pasillos amarillos sin salida',
    description: 'Pasillos amarillos sin salida',
    createdAt: '2026-09-06T17:20:00.000Z',
    likesCount: 128,
    principalEvidence: {
      description: 'Vista principal de los pasillos amarillos del Nivel 0',
      image: pasilloAmarillo,
    },
    author,
    levelClass: {
      id: 1,
      type: SurvivalClassType.STANDARD,
      classNumber: 'CLASE 0',
      securityLevel: 'SEGURO',
      legitimacy: 'VERIFICADO',
      dangerLevel: 'SIN ENTIDADES DAÑINAS',
      description: 'Nivel completamente seguro y sin entidades dañinas.',
      iconImage: pasilloAmarillo,
    },
  },
  {
    id: 9008,
    nivel: '1',
    title: 'Agua bajo las columnas',
    description: 'Agua bajo las columnas',
    createdAt: '2026-09-02T09:10:00.000Z',
    likesCount: 84,
    principalEvidence: {
      description: 'Nivel del agua a la altura del tobillo entre los pilares.',
      image: corredorInundado,
    },
    author,
    levelClass: {
      id: 2,
      type: SurvivalClassType.ENVIRONMENTAL,
      classNumber: 'CLASE 1',
      securityLevel: 'SEGURIDAD ALTA',
      legitimacy: 'VERIFICADO',
      dangerLevel: 'ENTIDADES ESCASAS',
      description: 'Estructura húmeda con riesgo de inundación progresiva.',
      iconImage: corredorInundado,
    },
  },
  {
    id: 8997,
    nivel: '37',
    title: 'La piscina que no termina',
    description: 'La piscina que no termina',
    createdAt: '2026-08-28T15:45:00.000Z',
    likesCount: 216,
    principalEvidence: {
      description: 'Corredor sumergido que continúa más allá de la linterna.',
      image: corredorSumergido,
    },
    author,
    levelClass: {
      id: 1,
      type: SurvivalClassType.STANDARD,
      classNumber: 'CLASE 1',
      securityLevel: 'SEGURIDAD ALTA',
      legitimacy: 'VERIFICADO',
      dangerLevel: 'SIN ENTIDADES DAÑINAS',
      description: 'Ambiente silencioso y estable, sin amenazas documentadas.',
      iconImage: corredorSumergido,
    },
  },
  {
    id: 8955,
    nivel: '4',
    title: 'La sala de las cuatro puertas',
    description: 'La sala de las cuatro puertas',
    createdAt: '2026-08-21T11:05:00.000Z',
    likesCount: 73,
    principalEvidence: {
      description: 'Cuatro salidas idénticas y ninguna devuelve al punto de partida.',
      image: salaAmarilla,
    },
    author,
    levelClass: {
      id: 3,
      type: SurvivalClassType.PSYCHOLOGICAL,
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'EN REVISIÓN',
      dangerLevel: 'ENTIDADES OCASIONALES',
      description: 'Desorientación sostenida por repetición arquitectónica.',
      iconImage: salaAmarilla,
    },
  },
  {
    id: 8902,
    nivel: '22',
    title: 'Ecos en el estacionamiento',
    description: 'Ecos en el estacionamiento',
    createdAt: '2026-08-14T20:30:00.000Z',
    likesCount: 51,
    principalEvidence: {
      description: 'Pasos que responden con retraso desde el fondo del nivel -3.',
      image: estacionamiento,
    },
    author,
    levelClass: {
      id: 4,
      type: SurvivalClassType.COMBINATION,
      classNumber: 'CLASE 3',
      securityLevel: 'PELIGROSO',
      legitimacy: 'SIN CONFIRMAR',
      dangerLevel: 'ENTIDADES HOSTILES',
      description: 'Riesgo ambiental y presencia sonora no identificada.',
      iconImage: estacionamiento,
    },
  },
  {
    id: 8870,
    nivel: '12',
    title: 'Taquillas que siguen cerrándose',
    description: 'Taquillas que siguen cerrándose',
    createdAt: '2026-08-05T07:55:00.000Z',
    likesCount: 39,
    principalEvidence: {
      description: 'El pasillo del instituto sigue activo fuera de horario.',
      image: institutoNocturno,
    },
    author,
    levelClass: {
      id: 3,
      type: SurvivalClassType.PSYCHOLOGICAL,
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'EN REVISIÓN',
      dangerLevel: 'ENTIDADES OCASIONALES',
      description: 'Actividad sin origen identificable en horas sin ocupación.',
      iconImage: institutoNocturno,
    },
  },
]

export const profileReportsPage: PaginatedResponse<Report> = {
  data: reports,
  page: 1,
  pageSize: 6,
  total: 6,
  totalPages: 1,
}
