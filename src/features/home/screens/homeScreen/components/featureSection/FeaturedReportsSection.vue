<script setup lang="ts">
import type { Report } from '@/features/report/model/Report'
import FeaturedReportCard from './FeaturedReportCard.vue'

interface Props {
  reports: Report[]
}

defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  exploreMore: []
}>()
</script>

<template>
  <section class="w-full px-5 py-14 md:px-12 md:py-20" aria-labelledby="archivos-destacados-titulo">
    <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p class="font-mono text-xs font-semibold tracking-[0.3em] text-liminal-primary">// 01</p>
        <h2
          id="archivos-destacados-titulo"
          class="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          ARCHIVOS DESTACADOS
        </h2>
        <p class="mt-2 font-mono text-xs tracking-[0.2em] text-white/50 uppercase md:text-sm">
          Niveles documentados por la comunidad
        </p>
      </div>

      <button
        type="button"
        class="group flex shrink-0 items-center gap-2 font-mono text-xs font-semibold tracking-[0.15em] text-liminal-primary uppercase outline-none transition-colors duration-200 hover:text-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:text-sm"
        @click="emit('exploreMore')"
      >
        <span>Explorar más niveles</span>
        <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-1"
          >→</span
        >
      </button>
    </div>

    <div class="mt-6 h-px w-full bg-white/10" />

    <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <FeaturedReportCard
        v-for="report in reports"
        :key="report.id"
        :report="report"
        @select="emit('select', $event)"
      />
    </div>
  </section>
</template>
