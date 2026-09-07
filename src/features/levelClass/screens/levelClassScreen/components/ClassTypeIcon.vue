<script setup lang="ts">
import { SurvivalClassType } from '@/features/levelClass/model/SurvivalClassType'

interface Props {
  type: string
}

defineProps<Props>()
</script>

<template>
  <!-- Decorativo: cada fila muestra el nombre del tipo junto al icono. -->
  <svg
    aria-hidden="true"
    class="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
  >
    <!-- Estándar: hexágono de la escala numérica -->
    <polygon
      v-if="type === SurvivalClassType.STANDARD"
      points="12,2 21,7 21,17 12,22 3,17 3,7"
      stroke-linejoin="round"
    />

    <!-- Ambiental: cordillera -->
    <path
      v-else-if="type === SurvivalClassType.ENVIRONMENTAL"
      d="M3 19L10 6l5 9 2-3.5L21 19H3z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Psicológica: cerebro -->
    <template v-else-if="type === SurvivalClassType.PSYCHOLOGICAL">
      <path
        d="M9.5 2A4.5 4.5 0 005 6.5c0 1.25.5 2.38 1.32 3.21A4.5 4.5 0 005 13.5c0 1.62.86 3.04 2.15 3.82A4.5 4.5 0 0011.5 21V2.1A4.47 4.47 0 009.5 2z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.5 2A4.5 4.5 0 0119 6.5c0 1.25-.5 2.38-1.32 3.21A4.5 4.5 0 0119 13.5c0 1.62-.86 3.04-2.15 3.82A4.5 4.5 0 0112.5 21V2.1A4.47 4.47 0 0114.5 2z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <!-- Combinada: diagrama de Venn -->
    <template v-else-if="type === SurvivalClassType.COMBINATION">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </template>

    <!-- Utópica: sol radiante -->
    <template v-else-if="type === SurvivalClassType.UTOPIAN">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.93-7.07l-1.41 1.41m-9.32 9.32l-1.41 1.41m12.14 0l-1.41-1.41M6.34 6.34L4.93 4.93"
        stroke-linecap="round"
      />
    </template>

    <!-- Distópica: triángulo invertido -->
    <polygon v-else-if="type === SurvivalClassType.DYSTOPIAN" points="4,5 20,5 12,20" />

    <!-- Cambiante: espiral -->
    <path
      v-else-if="type === SurvivalClassType.CHANGING"
      d="M12 12a2 2 0 102-2m-2 2a4 4 0 104-4 4 4 0 00-4 4m0 0a6 6 0 106-6 6 6 0 00-6 6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Sin clasificar: interrogación -->
    <template v-else-if="type === SurvivalClassType.UNCLASSIFIED">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke-linecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-width="2.5" />
    </template>

    <!-- Otra y cualquier valor no catalogado: puntos suspensivos -->
    <template v-else>
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="8.01" y2="12" stroke-linecap="round" stroke-width="2.5" />
      <line x1="12" y1="12" x2="12.01" y2="12" stroke-linecap="round" stroke-width="2.5" />
      <line x1="16" y1="12" x2="16.01" y2="12" stroke-linecap="round" stroke-width="2.5" />
    </template>
  </svg>
</template>
