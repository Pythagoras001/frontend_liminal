<script setup lang="ts">
import type { Evidence } from '@/features/report/model/Evidence'
import EvidenceFigure from './EvidenceFigure.vue'

interface Props {
  evidences: Evidence[]
  /** Posición de la primera evidencia de la galería: la principal ocupa la 01. */
  startIndex?: number
}

withDefaults(defineProps<Props>(), {
  startIndex: 2,
})
</script>

<template>
  <section aria-labelledby="galeria-evidencias-titulo" class="flex flex-col gap-7">
    <h2 id="galeria-evidencias-titulo" class="sr-only">Evidencias adicionales</h2>

    <EvidenceFigure
      v-for="(evidence, position) in evidences"
      :key="evidence.image.originalUrl"
      :evidence="evidence"
      :index="startIndex + position"
      label="Evidencia"
    />
  </section>
</template>
