import type { Image } from '@/features/shared/model/Image'
import type { Report } from '@/features/report/model/Report'
import { SurvivalClassType } from '@/features/levelClass/model/SurvivalClassType'

/**
 * Mock del detalle de reporte para la ruta /reports/:id. Reproduce el contenido
 * del diseño Stitch "LIMINAL - Detalle de Reporte (Pasillos Amarillos Sin
 * Salida)" (proyecto 8432011651729206521).
 *
 * El `id` coincide con el primer reporte de `exploreReports.mock`, de forma que
 * abrir esa tarjeta del archivo lleva a este detalle.
 */

/** Las imágenes mock no tienen variantes por tamaño, así que se reutiliza la misma URL. */
function imagen(url: string): Image {
  return { thumbnailUrl: url, mediumUrl: url, originalUrl: url }
}

export const reportDetail: Report = {
  id: 9012,
  nivel: '0',
  title: 'Pasillos amarillos sin salida',
  description: 'Pasillos amarillos sin salida',
  findingLog: [
    'Se encontró una extensa red de habitaciones amarillas iluminadas por luces fluorescentes. No se detectaron entidades hostiles y el lugar parece relativamente seguro.',
    'Los pasillos se repiten de forma aparentemente infinita, con una arquitectura uniforme y sin variaciones significativas. La iluminación se mantiene constante y no se identificaron salidas inmediatas, lo que sugiere que el nivel podría ser mucho más extenso de lo inicialmente observado.',
  ],
  createdAt: '2026-09-06T17:20:00.000Z',
  likesCount: 0,
  principalEvidence: {
    description: 'Vista principal de los pasillos amarillos del Nivel 0',
    image: imagen(
      'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
    ),
  },
  galeryEvidences: [
    {
      description: 'Habitación con múltiples entradas y sin salida visible',
      image: imagen(
        'https://lh3.googleusercontent.com/aida/AEtjO1UbgNGsEuJW0yv0yvkURh80LQZ9d8Q97uxmjNYceg_D08LwVH0JJ67XOQkc3dN6AB0g3hPIoYiVZxbLMBac9SNYDnj-FUEip87-YekUz9UL_E2o2UBfIyqMeGswjZ2MIrMa6kCfRdZr0UKZ8b3jWERvKuacXFkVCEOKNm9hFF0abRqASZAV9wV6BaiEIdvyfhrJS_0dIAeECFvvxnJY6RrqoFDAjz74gputszRNgE4kcZkSK9znznha3w',
      ),
    },
    {
      description: 'Tramo del corredor donde la iluminación no se interrumpe',
      image: imagen(
        'https://lh3.googleusercontent.com/aida/AEtjO1UffwtEY5qidBgRZA1KqKQUfEvxfH4WD39QlHVFwMUEMMdfn-Gqbf_Spy4gAektpRs9fso23RVfAnnfFm5hIlr2SrkKTgkdyfpp8V4bckGgkImvkLvP4Qk1_uRBbD8lejiEzuQBpd2ElB8aO47kQuV3LFVHBBpg6U2FIstGr-R7JXxSm-CNGw0VYt6CRpwqjokIZOLVLHn_Av3i9fA2FD72HYcJ4W_IF3-ebD6EGj5xAb22ywWDvph8ORg',
      ),
    },
    {
      description: 'Bifurcación sin señalización en el extremo norte del sector',
      image: imagen(
        'https://lh3.googleusercontent.com/aida/AEtjO1V94XNcJm7SlhJ8I0Xc0ZhQV7osWPQIw1HXjy8X2gHh3GEzujV5SAXenZxmst63JL_Cw71qll7-CrS3DaGuXPOYkxtrl7KtSefl1bMzNYpIA0v77UbfWRcPbKX6ruzF6X88fsmtPGcLAn8c05oji1isGdMBGMGfW0Rd3-6MC-B-3qv2R1adHiPFhWrTfwkGnOALSahPr7b1CK80qMMfXPOVk9-Ge7B2xtE3Y_IBcAKepSUHmaS-BQFWj2I',
      ),
    },
  ],
  author: {
    id: 44,
    userName: 'User44',
  },
  levelClass: {
    id: 1,
    type: SurvivalClassType.STANDARD,
    classNumber: 'CLASE 0',
    securityLevel: 'SEGURO',
    legitimacy: 'VERIFICADO',
    dangerLevel: 'SIN ENTIDADES DAÑINAS',
    description: 'Nivel completamente seguro y sin entidades dañinas.',
    iconImage: imagen(
      'https://res.cloudinary.com/covylvlk/image/upload/v1788787689/Gemini_Generated_Image_f5u0ojf5u0ojf5u0.png',
    ),
  },
}
