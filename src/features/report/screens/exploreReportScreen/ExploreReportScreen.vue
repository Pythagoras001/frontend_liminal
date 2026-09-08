<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useRateReport, useReport } from '@/features/report/hooks/useReport'
import { useReportArchiveFilters } from '@/features/report/hooks/useReportArchiveFilters'
import ReportArchiveHeader from './components/ReportArchiveHeader.vue'
import ReportToolbar from './components/ReportToolbar.vue'
import ReportGrid from './components/ReportGrid.vue'
import ReportPagination from '@/features/report/components/ReportPagination.vue'

/** Enlaza la barra de búsqueda con la rejilla mediante `aria-controls`. */
const REPORT_LIST_ID = 'reportes-listado'

const router = useRouter()

/**
 * Página pedida al servidor. Es la única fuente de verdad del listado: se pasa
 * como `ref` para que la query la incluya en su clave y vuelva a pedir los
 * datos al cambiarla.
 */
const page = shallowRef(1)

const { data: archive, isPending, isError, refetch } = useReport(page)

const reports = computed(() => archive.value?.data ?? [])

const { searchQuery, visibleReports } = useReportArchiveFilters(reports)

function changePage(nextPage: number) {
  page.value = nextPage
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function createReport() {
  router.push({ name: 'report-create' })
}

function selectReport(id: number) {
  router.push({ name: 'report-detail', params: { id } })
}

const { mutate: rateReport } = useRateReport()

/**
 * La tarjeta solo ofrece «me gusta»: repetirlo retira la valoración, porque el
 * servidor hace el toggle a partir del token.
 */
function likeReport(id: number) {
  rateReport({ reportId: id, liked: true })
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="mx-auto w-full max-w-380 flex-1 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <ReportArchiveHeader @create="createReport" />

      <p
        v-if="isPending"
        aria-live="polite"
        class="border-t border-b border-white/10 px-3 py-6 font-mono text-xs text-neutral-500 uppercase"
      >
        Recuperando el archivo de reportes…
      </p>

      <div
        v-else-if="isError"
        role="alert"
        class="flex flex-col items-start gap-3 border-t border-b border-white/10 px-3 py-6"
      >
        <p class="font-mono text-xs text-neutral-500 uppercase">
          No se pudo recuperar el archivo de reportes.
        </p>
        <button
          type="button"
          class="border border-white/20 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-neutral-300 uppercase transition-colors hover:border-white/40 hover:text-white"
          @click="refetch()"
        >
          Reintentar
        </button>
      </div>

      <template v-else-if="archive">
        <ReportToolbar
          v-model:search="searchQuery"
          :total="archive.total"
          :controls-id="REPORT_LIST_ID"
        />

        <ReportGrid
          :reports="visibleReports"
          :list-id="REPORT_LIST_ID"
          @select="selectReport"
          @like="likeReport"
        />

        <ReportPagination
          :page="archive.page"
          :page-size="archive.pageSize"
          :total="archive.total"
          :total-pages="archive.totalPages"
          :visible-count="visibleReports.length"
          @update:page="changePage"
        />
      </template>
    </main>

    <Footer />
  </div>
</template>
