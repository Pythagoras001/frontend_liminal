import type { Report } from '@/features/report/model/Report'

/**
 * Mock de reportes para la sección "Registros de la Comunidad" de Home.
 * Las imágenes y avatares provienen de los assets generados en el diseño
 * Stitch "LIMINAL - Home Contenido V2" (proyecto 8432011651729206521).
 *
 * `levelClass.legitimacy` se usa como el estado de verificación mostrado
 * en la insignia de cada registro: "Verificado" | "En revisión" | "Sin clasificar".
 */
export const communityReports: Report[] = [
  {
    id: 8841,
    nivel: '61',
    title: 'Supermercado sin final',
    description: 'Supermercado sin final',
    createdAt: '2026-09-06T19:42:00.000Z',
    likesCount: 24,
    principalEvidence: {
      image: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
      },
    },
    author: {
      id: 101,
      userName: 'NovaKeller',
      profileImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ',
      },
    },
    levelClass: {
      id: 61,
      type: 'Supermercado',
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'Verificado',
      dangerLevel: 'ENTIDADES DESCONOCIDAS',
      description: 'Pasillos idénticos. Las luces nunca se apagan.',
      iconImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vc70Y0R8BjXMCEM9pPVporUyikb_np-PeUYmQWIGvI4AgquTz_c9gFaYNjHDqeUnwiD6vn0-su2Izpv_ce1VOZ0x6DOutCHLyoa3K2bQDAmSH7U3O2DeHl5_e1necRmKCAqFOm7koOBT5PS3ngAA8y4cP5VY4nWTOqDl735tpDRXvcAFPFIC7Mh_cuOgcPOeUGfA3FXcy707iHvpkzPNbOWK_oio5DPQDT9Kk7UYz6m1MBRjeZtA3lL0o',
      },
    },
  },
  {
    id: 5502,
    nivel: '9',
    title: 'Puerta que no lleva a ningún lugar',
    description: 'Puerta que no lleva a ningún lugar',
    createdAt: '2026-09-06T19:00:00.000Z',
    likesCount: 17,
    principalEvidence: {
      image: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1WPx5VAo6XfGbKHS8u4Afw57-dkL9jpCgFFx7dUG4D5Wj9715Bhy9N7zQg5DwqXsfbyS03Q_2ItP-PHq7MTgEgeezptxOFPQBIM9MbiLFfGqJTkm5nHgC--lBkMJWKHyGffYc1_bFCG8Y4RC2gaTLKuTQ13FqGRCz4zr-9nqax_Z3rW1zjYKj2t-CyKNKsAOq3vL0FFNnhCcb7PDx909AOktTrDyIhFywS_6sKTmeBrmF25fJW9M92qHCI',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1WPx5VAo6XfGbKHS8u4Afw57-dkL9jpCgFFx7dUG4D5Wj9715Bhy9N7zQg5DwqXsfbyS03Q_2ItP-PHq7MTgEgeezptxOFPQBIM9MbiLFfGqJTkm5nHgC--lBkMJWKHyGffYc1_bFCG8Y4RC2gaTLKuTQ13FqGRCz4zr-9nqax_Z3rW1zjYKj2t-CyKNKsAOq3vL0FFNnhCcb7PDx909AOktTrDyIhFywS_6sKTmeBrmF25fJW9M92qHCI',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1WPx5VAo6XfGbKHS8u4Afw57-dkL9jpCgFFx7dUG4D5Wj9715Bhy9N7zQg5DwqXsfbyS03Q_2ItP-PHq7MTgEgeezptxOFPQBIM9MbiLFfGqJTkm5nHgC--lBkMJWKHyGffYc1_bFCG8Y4RC2gaTLKuTQ13FqGRCz4zr-9nqax_Z3rW1zjYKj2t-CyKNKsAOq3vL0FFNnhCcb7PDx909AOktTrDyIhFywS_6sKTmeBrmF25fJW9M92qHCI',
      },
    },
    author: {
      id: 102,
      userName: 'Rin_404',
      profileImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ',
      },
    },
    levelClass: {
      id: 9,
      type: 'Terminal aérea',
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'En revisión',
      dangerLevel: 'ENTIDADES ESCASAS',
      description: 'Puerta señalizada como salida de embarque sin destino conocido.',
      iconImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1WPx5VAo6XfGbKHS8u4Afw57-dkL9jpCgFFx7dUG4D5Wj9715Bhy9N7zQg5DwqXsfbyS03Q_2ItP-PHq7MTgEgeezptxOFPQBIM9MbiLFfGqJTkm5nHgC--lBkMJWKHyGffYc1_bFCG8Y4RC2gaTLKuTQ13FqGRCz4zr-9nqax_Z3rW1zjYKj2t-CyKNKsAOq3vL0FFNnhCcb7PDx909AOktTrDyIhFywS_6sKTmeBrmF25fJW9M92qHCI',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1WPx5VAo6XfGbKHS8u4Afw57-dkL9jpCgFFx7dUG4D5Wj9715Bhy9N7zQg5DwqXsfbyS03Q_2ItP-PHq7MTgEgeezptxOFPQBIM9MbiLFfGqJTkm5nHgC--lBkMJWKHyGffYc1_bFCG8Y4RC2gaTLKuTQ13FqGRCz4zr-9nqax_Z3rW1zjYKj2t-CyKNKsAOq3vL0FFNnhCcb7PDx909AOktTrDyIhFywS_6sKTmeBrmF25fJW9M92qHCI',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1WPx5VAo6XfGbKHS8u4Afw57-dkL9jpCgFFx7dUG4D5Wj9715Bhy9N7zQg5DwqXsfbyS03Q_2ItP-PHq7MTgEgeezptxOFPQBIM9MbiLFfGqJTkm5nHgC--lBkMJWKHyGffYc1_bFCG8Y4RC2gaTLKuTQ13FqGRCz4zr-9nqax_Z3rW1zjYKj2t-CyKNKsAOq3vL0FFNnhCcb7PDx909AOktTrDyIhFywS_6sKTmeBrmF25fJW9M92qHCI',
      },
    },
  },
  {
    id: 3310,
    nivel: '1',
    title: 'Sótano inundado',
    description: 'Sótano inundado',
    createdAt: '2026-09-06T17:00:00.000Z',
    likesCount: 9,
    principalEvidence: {
      image: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Wjd97qYTT0ftD00ldV6U31FX1KWV9An6RRv4UAzPNuPW4jAEbmYyZ5ZgftEG7DIZ-qYvUyD_Y1bUmLhbcNH2ffqp1UVWw8sAGQ1YIaM08L6wn1ADebof0IyEKE25CqdEveFFHpPCU8c45lC-bCWTQl3KANggMKDFZxR2eCrcSg1F-kXAC6i09ldVdqu1B78-k01myPySUuh9VnVbtelaCBo0CeYco6PBZ-yZ1_ueFb2TTk4aZ6DO6jHV8',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Wjd97qYTT0ftD00ldV6U31FX1KWV9An6RRv4UAzPNuPW4jAEbmYyZ5ZgftEG7DIZ-qYvUyD_Y1bUmLhbcNH2ffqp1UVWw8sAGQ1YIaM08L6wn1ADebof0IyEKE25CqdEveFFHpPCU8c45lC-bCWTQl3KANggMKDFZxR2eCrcSg1F-kXAC6i09ldVdqu1B78-k01myPySUuh9VnVbtelaCBo0CeYco6PBZ-yZ1_ueFb2TTk4aZ6DO6jHV8',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Wjd97qYTT0ftD00ldV6U31FX1KWV9An6RRv4UAzPNuPW4jAEbmYyZ5ZgftEG7DIZ-qYvUyD_Y1bUmLhbcNH2ffqp1UVWw8sAGQ1YIaM08L6wn1ADebof0IyEKE25CqdEveFFHpPCU8c45lC-bCWTQl3KANggMKDFZxR2eCrcSg1F-kXAC6i09ldVdqu1B78-k01myPySUuh9VnVbtelaCBo0CeYco6PBZ-yZ1_ueFb2TTk4aZ6DO6jHV8',
      },
    },
    author: {
      id: 103,
      userName: 'ElTipo325',
      profileImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBRMj9kB5CobWjU99RvhESy2BS2-4_BQkEvJPcQc8bfUypEfPNKoVHGtZ76Yu6Joi9fgaAjh93d0mIWPdjj7kOYbb8nywml6k4I9LBsmBaUEHUlMdOVGQsvp28EivzIMfuui4EdRumDs5sGfmg27dG9zqJNWLsBONzw7ljlikNtWZwnA5aNeqJY4Q0DW0jwQDI9fG-Hhnb0bFARwMTbZqC7Dy0j-qGfMD5_yBwWFajBh6KuqQ1vuBQw',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBRMj9kB5CobWjU99RvhESy2BS2-4_BQkEvJPcQc8bfUypEfPNKoVHGtZ76Yu6Joi9fgaAjh93d0mIWPdjj7kOYbb8nywml6k4I9LBsmBaUEHUlMdOVGQsvp28EivzIMfuui4EdRumDs5sGfmg27dG9zqJNWLsBONzw7ljlikNtWZwnA5aNeqJY4Q0DW0jwQDI9fG-Hhnb0bFARwMTbZqC7Dy0j-qGfMD5_yBwWFajBh6KuqQ1vuBQw',
        originalUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBRMj9kB5CobWjU99RvhESy2BS2-4_BQkEvJPcQc8bfUypEfPNKoVHGtZ76Yu6Joi9fgaAjh93d0mIWPdjj7kOYbb8nywml6k4I9LBsmBaUEHUlMdOVGQsvp28EivzIMfuui4EdRumDs5sGfmg27dG9zqJNWLsBONzw7ljlikNtWZwnA5aNeqJY4Q0DW0jwQDI9fG-Hhnb0bFARwMTbZqC7Dy0j-qGfMD5_yBwWFajBh6KuqQ1vuBQw',
      },
    },
    levelClass: {
      id: 1001,
      type: 'Sótano inundado',
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'Verificado',
      dangerLevel: 'ENTIDADES ESCASAS',
      description: 'Sótano con corredores encharcados y agua fría hasta la rodilla.',
      iconImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Wjd97qYTT0ftD00ldV6U31FX1KWV9An6RRv4UAzPNuPW4jAEbmYyZ5ZgftEG7DIZ-qYvUyD_Y1bUmLhbcNH2ffqp1UVWw8sAGQ1YIaM08L6wn1ADebof0IyEKE25CqdEveFFHpPCU8c45lC-bCWTQl3KANggMKDFZxR2eCrcSg1F-kXAC6i09ldVdqu1B78-k01myPySUuh9VnVbtelaCBo0CeYco6PBZ-yZ1_ueFb2TTk4aZ6DO6jHV8',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Wjd97qYTT0ftD00ldV6U31FX1KWV9An6RRv4UAzPNuPW4jAEbmYyZ5ZgftEG7DIZ-qYvUyD_Y1bUmLhbcNH2ffqp1UVWw8sAGQ1YIaM08L6wn1ADebof0IyEKE25CqdEveFFHpPCU8c45lC-bCWTQl3KANggMKDFZxR2eCrcSg1F-kXAC6i09ldVdqu1B78-k01myPySUuh9VnVbtelaCBo0CeYco6PBZ-yZ1_ueFb2TTk4aZ6DO6jHV8',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Wjd97qYTT0ftD00ldV6U31FX1KWV9An6RRv4UAzPNuPW4jAEbmYyZ5ZgftEG7DIZ-qYvUyD_Y1bUmLhbcNH2ffqp1UVWw8sAGQ1YIaM08L6wn1ADebof0IyEKE25CqdEveFFHpPCU8c45lC-bCWTQl3KANggMKDFZxR2eCrcSg1F-kXAC6i09ldVdqu1B78-k01myPySUuh9VnVbtelaCBo0CeYco6PBZ-yZ1_ueFb2TTk4aZ6DO6jHV8',
      },
    },
  },
  {
    id: 7724,
    nivel: '0',
    title: 'El pasillo se repite',
    description: 'El pasillo se repite',
    createdAt: '2026-09-06T15:00:00.000Z',
    likesCount: 11,
    principalEvidence: {
      image: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
      },
    },
    author: {
      id: 104,
      userName: 'SombraEstética',
      profileImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA_c8nFdGJmS4OUWhQti0fr50qaQpo3vx5rLYCxYytGp4c8DvdfS7QLtJgtuY5g0dRYL6w-ZKuBIR-kxNpkhJdUJbEfxPOdauiMcn2-e3uUSVRE246b9sHh76RjwdDy5kd6YxwFRJnknsOh_RD3skg6OYdfKYz2_8fr-yIq2XDvc7VaJlSCJ6Z4xG37IxocxmQASw8lBfOKUsNPuzylRWskuHmmMKZHfeDDt8EjYZP3iaej8VuSKFAo',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA_c8nFdGJmS4OUWhQti0fr50qaQpo3vx5rLYCxYytGp4c8DvdfS7QLtJgtuY5g0dRYL6w-ZKuBIR-kxNpkhJdUJbEfxPOdauiMcn2-e3uUSVRE246b9sHh76RjwdDy5kd6YxwFRJnknsOh_RD3skg6OYdfKYz2_8fr-yIq2XDvc7VaJlSCJ6Z4xG37IxocxmQASw8lBfOKUsNPuzylRWskuHmmMKZHfeDDt8EjYZP3iaej8VuSKFAo',
        originalUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA_c8nFdGJmS4OUWhQti0fr50qaQpo3vx5rLYCxYytGp4c8DvdfS7QLtJgtuY5g0dRYL6w-ZKuBIR-kxNpkhJdUJbEfxPOdauiMcn2-e3uUSVRE246b9sHh76RjwdDy5kd6YxwFRJnknsOh_RD3skg6OYdfKYz2_8fr-yIq2XDvc7VaJlSCJ6Z4xG37IxocxmQASw8lBfOKUsNPuzylRWskuHmmMKZHfeDDt8EjYZP3iaej8VuSKFAo',
      },
    },
    levelClass: {
      id: 0,
      type: 'Corredor amarillo',
      classNumber: 'CLASE 1',
      securityLevel: 'ESTABLE',
      legitimacy: 'Sin clasificar',
      dangerLevel: 'ENTIDADES ESCASAS',
      description: 'Corredor de moqueta amarilla que regresa siempre al mismo punto de partida.',
      iconImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1UttcyekPwMDyuqy6fJGMZDMxWpL_kQxMCHfA_NJvQA3tMOojdsdowpKi9TnZncxnB5fiN4es_SfiiANejs3LXJQPXPfme9alc4nxOImUheE-CLUp1KL0XDQHjFBpx61L-ufpsqEpzvK8WqCHnIS5AWszDATCErf6uK6Or22UfbsdOSgtH3aObDwX5BCQB-S562ydIRZE2WKPvxV7jmL3_OBfyZc3QQmRpMACnUTbH8BBG0-x_SFG5nx-0',
      },
    },
  },
  {
    id: 6193,
    nivel: '188',
    title: 'Área de juegos',
    description: 'Área de juegos',
    createdAt: '2026-09-06T12:00:00.000Z',
    likesCount: 6,
    principalEvidence: {
      image: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vx6r9uue148F8Pza2JL-RmesEEJ-zaMTNc4t7NfxaU7w0mg7ZPDIu_t3O-Hv7NRj7g5B4UtUOnNIYPZWL-wv09fpZ09SKY2UPz4xOa-H6JzcUUizV-KdEhJCfQ3-61JEoxXfTdGuRk0T25IREg2d1aViQeSKxJXXTIkbukU3nfS5T0VxU0_J8VdnilcFKLr9LLuC_QVPFYuS1rUTzMHlCYNvp5ItitUKlZwRyZHyjioYIy2G7PBbLh_70',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vx6r9uue148F8Pza2JL-RmesEEJ-zaMTNc4t7NfxaU7w0mg7ZPDIu_t3O-Hv7NRj7g5B4UtUOnNIYPZWL-wv09fpZ09SKY2UPz4xOa-H6JzcUUizV-KdEhJCfQ3-61JEoxXfTdGuRk0T25IREg2d1aViQeSKxJXXTIkbukU3nfS5T0VxU0_J8VdnilcFKLr9LLuC_QVPFYuS1rUTzMHlCYNvp5ItitUKlZwRyZHyjioYIy2G7PBbLh_70',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vx6r9uue148F8Pza2JL-RmesEEJ-zaMTNc4t7NfxaU7w0mg7ZPDIu_t3O-Hv7NRj7g5B4UtUOnNIYPZWL-wv09fpZ09SKY2UPz4xOa-H6JzcUUizV-KdEhJCfQ3-61JEoxXfTdGuRk0T25IREg2d1aViQeSKxJXXTIkbukU3nfS5T0VxU0_J8VdnilcFKLr9LLuC_QVPFYuS1rUTzMHlCYNvp5ItitUKlZwRyZHyjioYIy2G7PBbLh_70',
      },
    },
    author: {
      id: 105,
      userName: 'LuzPerdida',
      profileImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDL958Q89E8ymkpUNLVOxLVBWN8hj71kf24e04RlsB6UKtMX5fyk4JIRWgsLIbm2dT1GXd9wlx_I8ZPXLTn0D-2f-JZs558bQhMnnqlq3FH69GhlR-D97E99er4JldAxMY4Px4mo73lZtm-kwfCZKSdJsWaiSO9B-y0xdK7gJFU_YFhaP-vZ_O2Oy9suBangDVWzXT3mJJ_71IiTFxHtIFousmXI1fOfmEtFxLDYYM_YlYCXkHVhp',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDL958Q89E8ymkpUNLVOxLVBWN8hj71kf24e04RlsB6UKtMX5fyk4JIRWgsLIbm2dT1GXd9wlx_I8ZPXLTn0D-2f-JZs558bQhMnnqlq3FH69GhlR-D97E99er4JldAxMY4Px4mo73lZtm-kwfCZKSdJsWaiSO9B-y0xdK7gJFU_YFhaP-vZ_O2Oy9suBangDVWzXT3mJJ_71IiTFxHtIFousmXI1fOfmEtFxLDYYM_YlYCXkHVhp',
        originalUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDL958Q89E8ymkpUNLVOxLVBWN8hj71kf24e04RlsB6UKtMX5fyk4JIRWgsLIbm2dT1GXd9wlx_I8ZPXLTn0D-2f-JZs558bQhMnnqlq3FH69GhlR-D97E99er4JldAxMY4Px4mo73lZtm-kwfCZKSdJsWaiSO9B-y0xdK7gJFU_YFhaP-vZ_O2Oy9suBangDVWzXT3mJJ_71IiTFxHtIFousmXI1fOfmEtFxLDYYM_YlYCXkHVhp',
      },
    },
    levelClass: {
      id: 188,
      type: 'Área de juegos',
      classNumber: 'CLASE 2',
      securityLevel: 'INESTABLE',
      legitimacy: 'En revisión',
      dangerLevel: 'ENTIDADES ESCASAS',
      description: 'Zona de juegos infantil abandonada con estructuras tubulares oxidadas.',
      iconImage: {
        thumbnailUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vx6r9uue148F8Pza2JL-RmesEEJ-zaMTNc4t7NfxaU7w0mg7ZPDIu_t3O-Hv7NRj7g5B4UtUOnNIYPZWL-wv09fpZ09SKY2UPz4xOa-H6JzcUUizV-KdEhJCfQ3-61JEoxXfTdGuRk0T25IREg2d1aViQeSKxJXXTIkbukU3nfS5T0VxU0_J8VdnilcFKLr9LLuC_QVPFYuS1rUTzMHlCYNvp5ItitUKlZwRyZHyjioYIy2G7PBbLh_70',
        mediumUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vx6r9uue148F8Pza2JL-RmesEEJ-zaMTNc4t7NfxaU7w0mg7ZPDIu_t3O-Hv7NRj7g5B4UtUOnNIYPZWL-wv09fpZ09SKY2UPz4xOa-H6JzcUUizV-KdEhJCfQ3-61JEoxXfTdGuRk0T25IREg2d1aViQeSKxJXXTIkbukU3nfS5T0VxU0_J8VdnilcFKLr9LLuC_QVPFYuS1rUTzMHlCYNvp5ItitUKlZwRyZHyjioYIy2G7PBbLh_70',
        originalUrl:
          'https://lh3.googleusercontent.com/aida/AEtjO1Vx6r9uue148F8Pza2JL-RmesEEJ-zaMTNc4t7NfxaU7w0mg7ZPDIu_t3O-Hv7NRj7g5B4UtUOnNIYPZWL-wv09fpZ09SKY2UPz4xOa-H6JzcUUizV-KdEhJCfQ3-61JEoxXfTdGuRk0T25IREg2d1aViQeSKxJXXTIkbukU3nfS5T0VxU0_J8VdnilcFKLr9LLuC_QVPFYuS1rUTzMHlCYNvp5ItitUKlZwRyZHyjioYIy2G7PBbLh_70',
      },
    },
  },
]
