<script setup lang="ts">
import type { Report } from '@/features/report/model/Report'
import ReportCard from '@/features/report/components/ReportCard.vue'

interface Props {
  reports: Report[]
  /** Total de reportes del archivo personal, no solo los de esta página. */
  total: number
}

defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  like: [id: number]
}>()
</script>

<template>
  <section aria-labelledby="archivo-personal-titulo" class="pt-10 pb-8">
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="mb-1.5 font-mono text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
          Archivo personal
        </p>

        <h2
          id="archivos-destacados-titulo"
          class="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          REPORTES DOCUMENTADOS
        </h2>
      </div>

      <p class="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
        {{ total }} {{ total === 1 ? 'reporte' : 'reportes' }}
      </p>
    </div>

    <div v-if="reports.length" class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-7">
      <ReportCard
        v-for="report in reports"
        :key="report.id"
        :report="report"
        footer="date"
        @select="emit('select', $event)"
        @like="emit('like', $event)"
      />
    </div>

    <p
      v-else
      class="rounded border border-dashed border-white/10 bg-liminal-surface px-6 py-16 text-center font-mono text-xs tracking-[0.12em] text-white/45 uppercase"
    >
      Este explorador todavía no ha documentado ningún nivel.
    </p>
  </section>
</template>
