<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useReportArchiveFilters } from '@/features/report/hooks/useReportArchiveFilters'
import { exploreReportsPage } from './data/exploreReports.mock'
import ReportArchiveHeader from './components/ReportArchiveHeader.vue'
import ReportToolbar from './components/ReportToolbar.vue'
import ReportGrid from './components/ReportGrid.vue'
import ReportPagination from './components/ReportPagination.vue'

/** Enlaza la barra de búsqueda con la rejilla mediante `aria-controls`. */
const REPORT_LIST_ID = 'reportes-listado'

// TODO: sustituir el mock por `useReport(page)` cuando el endpoint esté disponible.
const archive = shallowRef(exploreReportsPage)

const { searchQuery, sortOrder, sortOptions, visibleReports } = useReportArchiveFilters(
  () => archive.value.data,
)

const page = computed(() => archive.value.page)

function changePage(nextPage: number) {
  // TODO: pedir la página al servidor; el mock solo contiene la primera.
  console.info('Cambiar a la página', nextPage)
}

function createReport() {
  // TODO: navegar al formulario de creación cuando exista la ruta correspondiente.
  console.info('Crear reporte')
}

function openFilters() {
  // TODO: abrir el panel de filtros avanzados cuando esté disponible.
  console.info('Abrir filtros avanzados')
}

function selectReport(id: number) {
  // TODO: navegar al detalle del reporte cuando exista la ruta correspondiente.
  console.info('Reporte seleccionado', id)
}

function likeReport(id: number) {
  // TODO: enviar la valoración al servidor cuando exista el endpoint.
  console.info('Valorar reporte', id)
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="mx-auto w-full max-w-[1520px] flex-1 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <ReportArchiveHeader @create="createReport" />

      <ReportToolbar
        v-model:search="searchQuery"
        v-model:sort-order="sortOrder"
        :sort-options="sortOptions"
        :total="archive.total"
        :controls-id="REPORT_LIST_ID"
        @filter="openFilters"
      />

      <ReportGrid
        :reports="visibleReports"
        :list-id="REPORT_LIST_ID"
        @select="selectReport"
        @like="likeReport"
      />

      <ReportPagination
        :page="page"
        :page-size="archive.pageSize"
        :total="archive.total"
        :total-pages="archive.totalPages"
        :visible-count="visibleReports.length"
        @update:page="changePage"
      />
    </main>

    <Footer />
  </div>
</template>
