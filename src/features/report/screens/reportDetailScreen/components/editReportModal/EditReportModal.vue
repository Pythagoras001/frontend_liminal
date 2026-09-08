<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, shallowRef, useId } from 'vue'
import type { Report } from '@/features/report/model/Report'
import type { UpdateReportPayload } from '@/features/report/model/EditReportDraft'
import { buildReportUpdate, createEditReportDraft } from '@/features/report/model/EditReportDraft'
import EditReportTextField from './EditReportTextField.vue'
import EditReportClassField from './EditReportClassField.vue'
import EditReportLogField from './EditReportLogField.vue'

interface Props {
  /** Expediente que se está editando; rellena el formulario al abrirlo. */
  report: Report
  /** La petición está en curso; solo cambia el texto del botón. */
  pending?: boolean
  /** Mensaje de error del servidor. */
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  errorMessage: undefined,
})

const emit = defineEmits<{
  /** Solo los campos que cambiaron, tal y como los espera el servidor. */
  submit: [payload: UpdateReportPayload]
  close: []
}>()

const titleId = useId()

const form = reactive(createEditReportDraft(props.report))
/** Las validaciones solo se muestran tras un primer intento de envío. */
const submitted = shallowRef(false)

const titleError = computed(() =>
  submitted.value && !form.title.trim() ? 'El título no puede quedar vacío.' : undefined,
)

const nivelError = computed(() =>
  submitted.value && !form.nivel.trim() ? 'Indica el nivel explorado.' : undefined,
)

const levelClassError = computed(() =>
  submitted.value && form.levelClassId === null ? 'Elige una clase de supervivencia.' : undefined,
)

const descriptionError = computed(() =>
  submitted.value && !form.description.trim() ? 'El registro no puede quedar vacío.' : undefined,
)

/**
 * Nombre decorativo del registro, con el mismo número de expediente que usa el
 * detalle: "LOG_001.TXT".
 */
const logName = computed(() => `LOG_${String(props.report.id).padStart(3, '0')}.TXT`)

/**
 * Lo que se enviaría ahora mismo: solo los campos que difieren del expediente.
 * Vacío mientras no se toque nada, y entonces el botón de guardar queda inerte.
 */
const update = computed(() => buildReportUpdate(form, props.report))

const hasChanges = computed(() => Object.keys(update.value).length > 0)

function handleSubmit() {
  submitted.value = true

  if (
    titleError.value ||
    nivelError.value ||
    levelClassError.value ||
    descriptionError.value ||
    !hasChanges.value
  ) {
    return
  }

  emit('submit', update.value)
}

/** El diálogo se cierra con Escape, como espera cualquier modal. */
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <!-- El clic en el fondo cierra; `self` evita que lo hagan los clics del panel. -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      @click.self="emit('close')"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="flex w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-white/10 bg-liminal-surface text-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      >
        <header
          class="flex items-center justify-between border-b border-white/10 bg-liminal-bg px-6 py-4"
        >
          <p :id="titleId" class="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              class="inline-block h-2 w-2 animate-pulse rounded-full bg-liminal-primary shadow-[0_0_8px_#ffb800]"
            ></span>
            <span
              class="font-mono text-xs font-semibold tracking-[0.2em] text-liminal-primary uppercase"
            >
              Expediente // Editar reporte
            </span>
          </p>

          <button
            type="button"
            aria-label="Cerrar"
            class="rounded-sm p-1 text-white/50 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
            @click="emit('close')"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </header>

        <form novalidate @submit.prevent="handleSubmit">
          <div class="space-y-5 p-6">
            <EditReportTextField
              v-model="form.title"
              label="Título del reporte"
              placeholder="Pasillos amarillos sin salida"
              :error="titleError"
            />

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <EditReportTextField
                v-model="form.nivel"
                label="Nivel"
                placeholder="Nivel 0"
                :error="nivelError"
              />

              <EditReportClassField
                v-model="form.levelClassId"
                label="Clase de supervivencia"
                :error="levelClassError"
              />
            </div>

            <EditReportLogField
              v-model="form.description"
              label="Registro de observación"
              :log-name="logName"
              :error="descriptionError"
            />

            <p
              v-if="errorMessage"
              role="alert"
              class="border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300"
            >
              {{ errorMessage }}
            </p>
          </div>

          <div
            class="flex items-center justify-end gap-3 border-t border-white/10 bg-liminal-bg px-6 py-4"
          >
            <button
              type="button"
              class="rounded-sm border border-white/15 px-5 py-2.5 font-mono text-xs tracking-[0.18em] text-white/60 uppercase outline-none transition-colors hover:border-white/40 hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
              @click="emit('close')"
            >
              Cancelar
            </button>

            <button
              type="submit"
              :disabled="!hasChanges"
              class="rounded-sm bg-liminal-primary px-6 py-2.5 font-mono text-xs font-bold tracking-[0.18em] text-liminal-on-primary uppercase shadow-[0_0_15px_rgba(255,184,0,0.3)] outline-none transition-all hover:bg-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-liminal-primary"
            >
              {{ pending ? 'Guardando…' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
