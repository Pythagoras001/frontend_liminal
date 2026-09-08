<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useCurrentUser } from '@/features/login/hooks/useCurrentUser'
import {
  useDeleteReport,
  useEditReport,
  useRateReport,
  useReportById,
} from '@/features/report/hooks/useReport'
import type { UpdateReportPayload } from '@/features/report/model/EditReportDraft'
import ReportDetailHeader from './components/ReportDetailHeader.vue'
import EvidenceFigure from './components/EvidenceFigure.vue'
import ReportFindingLog from './components/ReportFindingLog.vue'
import LevelClassPanel from './components/LevelClassPanel.vue'
import EvidenceGallery from './components/EvidenceGallery.vue'
import DeleteReportModal from './components/DeleteReportModal.vue'
import EditReportModal from './components/editReportModal/EditReportModal.vue'

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

const { data: currentUser } = useCurrentUser()

/**
 * Solo el autor ve las acciones de edición y borrado. Es una comprobación de
 * interfaz, no de seguridad: quien decide de verdad es el servidor a partir del
 * token, aquí solo se evita ofrecer un botón que iba a responder 403.
 */
const isOwner = computed(
  () => currentUser.value !== undefined && currentUser.value.id === report.value?.author.id,
)

/** Visibilidad del aviso de confirmación del borrado. */
const isConfirmingDelete = shallowRef(false)

const {
  mutate: deleteReport,
  reset: resetDeleteMutation,
  isPending: isDeleting,
  error: deleteError,
} = useDeleteReport()

/** Traduce el fallo de la petición a un mensaje que el explorador entienda. */
const deleteErrorMessage = computed(() => {
  if (!deleteError.value) {
    return undefined
  }
  if (isAxiosError(deleteError.value)) {
    const status = deleteError.value.response?.status
    if (status === 403) {
      return 'Este expediente no es tuyo, así que no puedes retirarlo del archivo.'
    }
    if (status === 404) {
      return 'El expediente ya no existe en el archivo.'
    }
  }
  return 'No se pudo eliminar el expediente. Inténtalo de nuevo.'
})

/**
 * El aviso solo se cierra si el servidor confirma; si falla, sigue abierto con
 * el mensaje del error. Con el expediente ya borrado no queda nada que mirar en
 * esta pantalla, así que se sustituye por el archivo personal en el historial
 * para que volver atrás no traiga de vuelta un detalle inexistente.
 */
function confirmDelete() {
  if (!report.value) {
    return
  }

  deleteReport(report.value.id, {
    onSuccess: () => {
      isConfirmingDelete.value = false
      router.replace({ name: 'profile' })
    },
  })
}

/**
 * Al cerrar se descarta el error anterior para que la próxima apertura no
 * arranque mostrando el fallo del intento pasado.
 */
function closeDeleteConfirmation() {
  isConfirmingDelete.value = false
  resetDeleteMutation()
}

/** Visibilidad del formulario de edición. */
const isEditing = shallowRef(false)

const {
  mutate: editReport,
  reset: resetEditMutation,
  isPending: isSaving,
  error: editError,
} = useEditReport()

/** Traduce el fallo de la petición a un mensaje que el explorador entienda. */
const editErrorMessage = computed(() => {
  if (!editError.value) {
    return undefined
  }
  if (isAxiosError(editError.value)) {
    const status = editError.value.response?.status
    if (status === 403) {
      return 'Este expediente no es tuyo, así que no puedes modificarlo.'
    }
    if (status === 404) {
      return 'El expediente ya no existe en el archivo.'
    }
  }
  return 'No se pudieron guardar los cambios. Inténtalo de nuevo.'
})

/**
 * El formulario solo se cierra si el servidor confirma; si falla, sigue abierto
 * con el mensaje del error y lo que el explorador había escrito.
 */
function saveEdit(payload: UpdateReportPayload) {
  if (!report.value) {
    return
  }

  editReport({ reportId: report.value.id, payload }, { onSuccess: () => (isEditing.value = false) })
}

/**
 * Al cerrar se descarta el error anterior para que la próxima apertura no
 * arranque mostrando el fallo del intento pasado.
 */
function closeEdit() {
  isEditing.value = false
  resetEditMutation()
}

function viewClass() {
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
          :can-delete="isOwner"
          :can-edit="isOwner"
          @rate="rate"
          @delete="isConfirmingDelete = true"
          @edit="isEditing = true"
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

    <EditReportModal
      v-if="isEditing && report"
      :report="report"
      :pending="isSaving"
      :error-message="editErrorMessage"
      @submit="saveEdit"
      @close="closeEdit"
    />

    <DeleteReportModal
      v-if="isConfirmingDelete && report"
      :report-title="report.title"
      :pending="isDeleting"
      :error-message="deleteErrorMessage"
      @confirm="confirmDelete"
      @close="closeDeleteConfirmation"
    />

    <Footer />
  </div>
</template>
