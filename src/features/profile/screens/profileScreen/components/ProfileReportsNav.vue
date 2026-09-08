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
