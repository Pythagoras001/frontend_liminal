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
    subtitulo: 'Salón de espera',
    clase: 'CLASE 1',
    estado: 'ESTABLE',
    entidades: 'ENTIDADES ESCASAS',
    materiales: ['Alfombra amarilla', 'Papel tapiz', 'Zumbido eléctrico'],
    badges: ['SEGURO', 'ESTABLE', 'ACTIVO'],
    activo: false,
    imgFondo:
      'https://lh3.googleusercontent.com/aida/AEtjO1WrRQ7nzrHQY2UoZPwiKQoZwyfdPj7flVuytdojspUlZu36Wah6vDij1OsItl-OMFtjvZIKWGeGupsWe4prTrwJ-efw13zGj2i7nwl-h-Y63AYX-5nyDjiHjdeiw6cIi-PZwbRZq25ojMUS2MFqwzODxOlX9jQn9nV4W5WjxZuyUhj-BedLArSV2TzgbnqTF5cp52oPi3kGSBbswTTYbq-CIBzPeZ-bq9Lv6M9NUNGL6i1P7iq-URO37SI',
    imgCardExpo:
      'https://lh3.googleusercontent.com/aida/AEtjO1WrRQ7nzrHQY2UoZPwiKQoZwyfdPj7flVuytdojspUlZu36Wah6vDij1OsItl-OMFtjvZIKWGeGupsWe4prTrwJ-efw13zGj2i7nwl-h-Y63AYX-5nyDjiHjdeiw6cIi-PZwbRZq25ojMUS2MFqwzODxOlX9jQn9nV4W5WjxZuyUhj-BedLArSV2TzgbnqTF5cp52oPi3kGSBbswTTYbq-CIBzPeZ-bq9Lv6M9NUNGL6i1P7iq-URO37SI',
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
      'https://lh3.googleusercontent.com/aida/AEtjO1X6pFdTHPL-wKBQejEkFcUgYnuuEf9sLQa8CvtpvUpPwNaZqQRs_1IwGFjwJ94S4_hyZoDWUkmCk1pZDV7GQDOu-ImXsYpirpsGBGh5f8Imor_ZO5mzkAbtIVJzeEB4DSPHblu8mEEdSmm_1iJmh1HIA5WTOCLeToKnoxW2ntZ-xDLrNf1YEEm7s5eIO-aCTEMVoRqlvv40vSJSJC6UOmEjt9J5WSkLuo7xDPJGxqMVJ2BW1xn3QwBMddI',
    imgCardExpo:
      'https://lh3.googleusercontent.com/aida/AEtjO1X6pFdTHPL-wKBQejEkFcUgYnuuEf9sLQa8CvtpvUpPwNaZqQRs_1IwGFjwJ94S4_hyZoDWUkmCk1pZDV7GQDOu-ImXsYpirpsGBGh5f8Imor_ZO5mzkAbtIVJzeEB4DSPHblu8mEEdSmm_1iJmh1HIA5WTOCLeToKnoxW2ntZ-xDLrNf1YEEm7s5eIO-aCTEMVoRqlvv40vSJSJC6UOmEjt9J5WSkLuo7xDPJGxqMVJ2BW1xn3QwBMddI',
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
    imgFondo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0yEoQGU12qNQT_kvZLkZzN0II41a7q4XT4SP08-VzY78aOiakUh_AVDZgT2O8yOJzl6rQ0bX_tI5Lmy_Xy0LkqI-acjsQ7m3J3ZWpcoVVnXX2mWDZBpZtEwnLZ9RDzG9hBs8nyNZY_klMClojBPrIYZKGbB8gyJfeltUh0wKrXACswHcxHSgXl5tmq1n5I8r-baX72DJm7_Un6p0fSXVLWYw8S_xbo6GUbbW4YuSdYXim-PSnNfTv',
    imgCardExpo:
      'https://lh3.googleusercontent.com/aida/AEtjO1VMlZbEP9P_oaCG-zitIPqyFH4pt2-48xQtNoFBDXatwv40WYPoXIV3-5Pf81iI6n9jutaPaldBHqZvN3ETfhn6xWEO6_RmzoZroQfJhJsXgo8yjTb5gP_R9R3aYMVSmlvjZ4ojTpuTyKMPEFFJIMQNAahlH24obw_rfoqBHGNq6oqOgkeeG25tJn7ZMgF75109gPqMwiQ6sTE7qI4X8UmryVNe9w1CA-I5WJuSKhjqHrQzCLMJcixwuVQ',
  },
  {
    id: 'nivel-94',
    numero: '03',
    nombre: 'Nivel 94',
    subtitulo: 'Zona sin clasificar',
    clase: 'CLASE 3',
    estado: 'DESCONOCIDO',
    entidades: 'ENTIDADES DESCONOCIDAS',
    materiales: ['Registro incompleto'],
    badges: ['INESTABLE', 'DESCONOCIDO'],
    activo: false,
    imgFondo:
      'https://lh3.googleusercontent.com/aida/AEtjO1VPWeQ6qwLPdgKVCZIDrXcb9gbmj2G_GzLW2i0xfvdUAfqpvRJcZMij7Lv2yHJO97mTNDjWN5vmCxh0jjTIbXjZaT4Q4Jl3oYVlw6uggeANnSUT6h-7symiz5e0bk4f-AEVXKwmktxxlM0RcTgGxxt6GLtSr-avQROZ5Ad7yi8i7D1qAllg7xNofKT80rjWa0XHudslxX9oj_jRFVxZMrRRSWIHHji1yZkQtyFzZYawg4CTB7DdsonC91k',
    imgCardExpo:
      'https://lh3.googleusercontent.com/aida/AEtjO1VPWeQ6qwLPdgKVCZIDrXcb9gbmj2G_GzLW2i0xfvdUAfqpvRJcZMij7Lv2yHJO97mTNDjWN5vmCxh0jjTIbXjZaT4Q4Jl3oYVlw6uggeANnSUT6h-7symiz5e0bk4f-AEVXKwmktxxlM0RcTgGxxt6GLtSr-avQROZ5Ad7yi8i7D1qAllg7xNofKT80rjWa0XHudslxX9oj_jRFVxZMrRRSWIHHji1yZkQtyFzZYawg4CTB7DdsonC91k',
  },
]
