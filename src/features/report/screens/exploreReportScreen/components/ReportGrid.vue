<script setup lang="ts">
import type { Report } from '@/features/report/model/Report'
import ReportCard from '@/features/report/components/ReportCard.vue'

interface Props {
  reports: Report[]
  /** Enlazado desde la barra de búsqueda con `aria-controls`. */
  listId: string
}

defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  like: [id: number]
}>()
</script>

<template>
  <section :id="listId" aria-label="Reportes de exploración" class="mb-12">
    <div
      v-if="reports.length"
      class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <ReportCard
        v-for="report in reports"
        :key="report.id"
        :report="report"
        @select="emit('select', $event)"
        @like="emit('like', $event)"
      />
    </div>

    <p
      v-else
      class="rounded border border-dashed border-white/10 bg-liminal-surface px-6 py-16 text-center font-mono text-xs tracking-[0.12em] text-white/45 uppercase"
    >
      Ningún registro coincide con la búsqueda.
    </p>
  </section>
</template>
