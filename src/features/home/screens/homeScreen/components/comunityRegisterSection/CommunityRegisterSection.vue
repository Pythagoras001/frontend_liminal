<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/features/report/model/Report'
import CommunityReportCard from './CommunityReportCard.vue'

interface Props {
  reports: Report[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  publish: []
  viewAll: []
}>()

const featuredReport = computed(() => props.reports[0])
const compactReports = computed(() => props.reports.slice(1))
</script>

<template>
  <section
    class="w-full border-t border-white/10 px-5 py-14 md:px-12 md:py-20"
    aria-labelledby="registros-comunidad-titulo"
  >
    <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="font-mono text-xs font-semibold tracking-[0.3em] text-liminal-primary">// 02</p>
        <h2
          id="registros-comunidad-titulo"
          class="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          REGISTROS DE LA COMUNIDAD
        </h2>
        <p class="mt-2 text-sm text-white/50 md:text-base">
          Evidencia compartida por quienes encontraron una entrada.
        </p>
      </div>

      <div class="flex shrink-0 items-center gap-4 self-stretch sm:self-end sm:pb-1.5">
        <span class="hidden h-px w-10 bg-white/20 sm:inline-block" />
        <span class="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase md:text-xs">
          Fotografías reales. Experiencias reales. Un archivo vivo.
        </span>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
      <CommunityReportCard
        v-if="featuredReport"
        featured
        class="lg:row-span-2"
        :report="featuredReport"
        @select="emit('select', $event)"
      />
      <CommunityReportCard
        v-for="report in compactReports"
        :key="report.id"
        :report="report"
        @select="emit('select', $event)"
      />
    </div>

    <div class="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <button
        type="button"
        class="inline-flex items-center gap-3 rounded-[3px] bg-liminal-primary px-6 py-3.5 text-xs font-bold tracking-wider text-liminal-on-primary uppercase shadow-lg shadow-liminal-primary/10 outline-none transition-all duration-150 hover:bg-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 md:text-sm"
        @click="emit('publish')"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path d="M12 5v14m-7-7h14" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>Publicar un hallazgo</span>
      </button>

      <button
        type="button"
        class="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.15em] text-white/70 uppercase outline-none transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:text-sm"
        @click="emit('viewAll')"
      >
        <span>Ver todos los registros</span>
        <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-1"
          >→</span
        >
      </button>
    </div>
  </section>
</template>
