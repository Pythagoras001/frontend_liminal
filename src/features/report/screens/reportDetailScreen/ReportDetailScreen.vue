<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useRateReport, useReportById } from '@/features/report/hooks/useReport'
import ReportDetailHeader from './components/ReportDetailHeader.vue'
import EvidenceFigure from './components/EvidenceFigure.vue'
import ReportFindingLog from './components/ReportFindingLog.vue'
import LevelClassPanel from './components/LevelClassPanel.vue'
import EvidenceGallery from './components/EvidenceGallery.vue'

interface Props {
  /** Id del reporte tomado de la ruta `/reports/:id`. */
  id: string
}

const props = defineProps<Props>()

const router = useRouter()

/** El id viaja en la URL como cadena; el hook lo pide numérico. */
const { data: report, isPending, isError, error, refetch } = useReportById(() => Number(props.id))

/** Un expediente inexistente no es un fallo de red: merece su propio aviso. */
const isNotFound = computed(() => isAxiosError(error.value) && error.value.response?.status === 404)

const archiveNumber = computed(() =>
  report.value === undefined ? '' : String(report.value.id).padStart(3, '0'),
)

const galleryEvidences = computed(() => report.value?.galeryEvidences ?? [])

/**
 * El servidor manda el relato como un único texto con saltos de línea, así que
 * aquí se corta en párrafos: `ReportFindingLog` pinta uno por entrada.
 */
const findingParagraphs = computed(() =>
  (report.value?.description ?? '')
    .split(/\r?\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph !== ''),
)

const { mutate: rateReport } = useRateReport()

/**
 * Al confirmarse la valoración se vuelve a pedir el expediente, de modo que el
 * detalle muestre el estado que tiene el servidor en ese momento y no solo el
 * contador que el hook dejó en la caché.
 */
function rate(id: number, liked: boolean) {
  rateReport({ reportId: id, liked }, { onSuccess: () => refetch() })
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
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="mx-auto w-full max-w-[1520px] flex-1 px-4 py-7 sm:px-6 lg:px-8">
      <p
        v-if="isPending"
        aria-live="polite"
        class="border-t border-b border-white/10 px-3 py-6 font-mono text-xs text-neutral-500 uppercase"
      >
        Recuperando el expediente…
      </p>

      <div
        v-else-if="isError"
        role="alert"
        class="flex flex-col items-start gap-3 border-t border-b border-white/10 px-3 py-6"
      >
        <p class="font-mono text-xs text-neutral-500 uppercase">
          {{
            isNotFound
              ? 'El expediente solicitado no existe en el archivo.'
              : 'No se pudo recuperar el expediente.'
          }}
        </p>
        <button
          v-if="!isNotFound"
          type="button"
          class="border border-white/20 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-neutral-300 uppercase transition-colors hover:border-white/40 hover:text-white"
          @click="refetch()"
        >
          Reintentar
        </button>
      </div>

      <template v-else-if="report">
        <ReportDetailHeader
          :report="report"
          :archive-number="archiveNumber"
          @rate="rate"
          @options="openOptions"
        />

        <div class="mt-2 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div class="flex flex-col gap-8 lg:col-span-8">
            <EvidenceFigure
              :evidence="report.principalEvidence"
              :index="1"
              label="Evidencia principal"
            />

            <ReportFindingLog v-if="findingParagraphs.length" :paragraphs="findingParagraphs" />
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
      </template>
    </main>

    <Footer />
  </div>
</template>
