<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { reportDetail } from './data/reportDetail.mock'
import ReportBreadcrumbs from './components/ReportBreadcrumbs.vue'
import ReportDetailHeader from './components/ReportDetailHeader.vue'
import EvidenceFigure from './components/EvidenceFigure.vue'
import ReportFindingLog from './components/ReportFindingLog.vue'
import LevelClassPanel from './components/LevelClassPanel.vue'
import EvidenceGallery from './components/EvidenceGallery.vue'
import ReportDetailNav from './components/ReportDetailNav.vue'

interface Props {
  /** Id del reporte tomado de la ruta `/reports/:id`. */
  id: string
}

defineProps<Props>()

const router = useRouter()

// TODO: pedir el reporte con el prop `id` cuando exista `ReportApi.findById()`;
// por ahora el mock es el único expediente disponible, sea cual sea la URL.
const report = shallowRef(reportDetail)

const archiveNumber = computed(() => String(report.value.id).padStart(3, '0'))

const galleryEvidences = computed(() => report.value.galeryEvidences ?? [])

function likeReport(id: number) {
  // TODO: enviar la valoración al servidor cuando exista el endpoint.
  console.info('Valorar reporte', id)
}

function openOptions(id: number) {
  // TODO: abrir el menú de acciones del reporte cuando esté disponible.
  console.info('Acciones del reporte', id)
}

function viewClass(id: number) {
  // TODO: enlazar al detalle de la clase cuando exista esa ruta; de momento
  // se abre el catálogo completo de clases.
  console.info('Ver clase completa', id)
  router.push({ name: 'class' })
}

function goToNextReport() {
  // TODO: navegar al siguiente expediente cuando el listado exponga su orden.
  console.info('Siguiente reporte')
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="mx-auto w-full max-w-[1520px] flex-1 px-4 py-7 sm:px-6 lg:px-8">
      <ReportBreadcrumbs :nivel="report.nivel" :archive-number="archiveNumber" />

      <ReportDetailHeader
        :report="report"
        :archive-number="archiveNumber"
        @like="likeReport"
        @options="openOptions"
      />

      <div class="mt-2 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div class="flex flex-col gap-8 lg:col-span-8">
          <EvidenceFigure
            :evidence="report.principalEvidence"
            :index="1"
            label="Evidencia principal"
          />

          <ReportFindingLog v-if="report.findingLog?.length" :paragraphs="report.findingLog" />
        </div>

        <div class="flex flex-col gap-7 lg:col-span-4">
          <LevelClassPanel
            :level-class="report.levelClass"
            :author="report.author"
            @view-class="viewClass"
          />

          <EvidenceGallery v-if="galleryEvidences.length" :evidences="galleryEvidences" />
        </div>
      </div>

      <ReportDetailNav @next="goToNextReport" />
    </main>

    <Footer />
  </div>
</template>
