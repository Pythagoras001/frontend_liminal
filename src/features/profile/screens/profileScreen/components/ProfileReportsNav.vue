<script setup lang="ts">
import ReportPagination from '@/features/report/components/ReportPagination.vue'

interface Props {
  page: number
  pageSize: number
  total: number
  totalPages: number
  visibleCount: number
}

defineProps<Props>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()
</script>

<template>
  <div class="mt-12 space-y-6">
    <div class="text-center">
      <RouterLink
        :to="{ name: 'reports' }"
        class="group inline-flex items-center gap-2 rounded font-mono text-xs font-semibold tracking-[0.2em] text-liminal-primary uppercase outline-none transition-colors hover:text-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      >
        <span>Ver todos los reportes</span>
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
      </RouterLink>
    </div>

    <ReportPagination
      :page="page"
      :page-size="pageSize"
      :total="total"
      :total-pages="totalPages"
      :visible-count="visibleCount"
      @update:page="emit('update:page', $event)"
    />
  </div>
</template>
