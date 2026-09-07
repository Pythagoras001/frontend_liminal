<script setup lang="ts">
import { computed, reactive, shallowRef } from 'vue'
import type { NewReportDraft } from '@/features/report/model/NewReportDraft'
import { createEmptyReportDraft } from '@/features/report/model/NewReportDraft'
import { CLASS_OPTIONS, LEVEL_OPTIONS } from '../data/reportFormOptions'
import FormField from './FormField.vue'
import SelectField from './SelectField.vue'
import EvidenceDropzone from './EvidenceDropzone.vue'
import EvidencePreview from './EvidencePreview.vue'
import GallerySection from './GallerySection.vue'

interface Props {
  /** Deshabilita el envío mientras la publicación está en curso. */
  pending?: boolean
  /** Mensaje de error del servidor. */
  errorMessage?: string
}

withDefaults(defineProps<Props>(), {
  pending: false,
  errorMessage: undefined,
})

const emit = defineEmits<{
  submit: [draft: NewReportDraft]
  cancel: []
}>()

const form = reactive(createEmptyReportDraft())
/** Los desplegables trabajan con cadenas; la clase se convierte al enviar. */
const levelClass = shallowRef('')
/** La validación de la imagen solo se muestra tras un primer intento de envío. */
const submitted = shallowRef(false)

const evidenceError = computed(() =>
  submitted.value && !form.principalEvidence
    ? 'Adjunta una fotografía como evidencia principal.'
    : undefined,
)

function setPrincipalEvidence(files: File[]) {
  form.principalEvidence = files[0] ?? null
}

function handleSubmit() {
  submitted.value = true
  if (!form.principalEvidence) {
    return
  }

  emit('submit', {
    ...form,
    levelClassId: Number(levelClass.value),
    galleryEvidences: [...form.galleryEvidences],
  })
}
</script>

<template>
  <form class="space-y-6" novalidate @submit.prevent="handleSubmit">
    <FormField label="Título" control-id="reporte-titulo">
      <input
        id="reporte-titulo"
        v-model="form.title"
        type="text"
        required
        placeholder="Pasillos amarillos sin salida"
        class="w-full rounded border border-white/10 bg-liminal-surface px-4 py-3 font-mono text-sm text-neutral-100 placeholder-white/30 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
      />
    </FormField>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SelectField
        v-model="form.nivel"
        label="Nivel"
        control-id="reporte-nivel"
        placeholder="Selecciona un nivel"
        :options="LEVEL_OPTIONS"
      />
      <SelectField
        v-model="levelClass"
        label="Clase"
        control-id="reporte-clase"
        placeholder="Selecciona una clase"
        :options="CLASS_OPTIONS"
      />
    </div>

    <FormField label="Descripción" control-id="reporte-descripcion">
      <textarea
        id="reporte-descripcion"
        v-model="form.description"
        rows="4"
        required
        placeholder="Describe el hallazgo: qué encontraste, en qué estado y qué riesgos observaste."
        class="w-full rounded border border-white/10 bg-liminal-surface px-4 py-3 font-mono text-sm leading-relaxed text-neutral-200 placeholder-white/30 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
      ></textarea>
    </FormField>

    <FormField label="Evidencia principal" :error="evidenceError">
      <EvidencePreview
        v-if="form.principalEvidence"
        featured
        :file="form.principalEvidence"
        @remove="form.principalEvidence = null"
      />
      <EvidenceDropzone v-else @select="setPrincipalEvidence" />
    </FormField>

    <FormField label="Descripción de la imagen" control-id="reporte-pie-foto">
      <input
        id="reporte-pie-foto"
        v-model="form.principalEvidenceCaption"
        type="text"
        placeholder="Añadir pie de foto o notas visuales del hallazgo..."
        class="w-full rounded border border-white/10 bg-liminal-surface px-4 py-3 font-mono text-sm text-neutral-200 placeholder-white/30 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
      />
    </FormField>

    <GallerySection v-model="form.galleryEvidences" />

    <div class="border-t border-white/10 pt-4"></div>

    <p
      v-if="errorMessage"
      role="alert"
      class="border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300"
    >
      {{ errorMessage }}
    </p>

    <div class="flex items-center justify-between pt-1">
      <button
        type="button"
        class="rounded font-mono text-xs font-semibold tracking-wider text-white/50 uppercase underline decoration-white/25 underline-offset-4 outline-none transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('cancel')"
      >
        Cancelar
      </button>

      <button
        type="submit"
        :disabled="pending"
        class="rounded bg-liminal-primary px-7 py-3 font-mono text-xs font-bold tracking-wider text-liminal-on-primary uppercase shadow-[0_0_16px_rgba(255,184,0,0.25)] outline-none transition-all hover:bg-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-liminal-primary"
      >
        {{ pending ? 'Publicando…' : 'Publicar reporte' }}
      </button>
    </div>
  </form>
</template>
