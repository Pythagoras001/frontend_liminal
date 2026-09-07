<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import {
  createEvidenceDraft,
  type NewReportEvidenceDraft,
} from '@/features/report/model/NewReportDraft'
import EvidenceDropzone from './EvidenceDropzone.vue'
import EvidencePreview from './EvidencePreview.vue'

const evidences = defineModel<NewReportEvidenceDraft[]>({ required: true })

const panelId = useId()
const descriptionId = useId()
/** Arranca plegada, como en el diseño; se abre al añadir imágenes. */
const isOpen = shallowRef(false)

function addFiles(added: File[]) {
  evidences.value = [...evidences.value, ...added.map(createEvidenceDraft)]
}

function removeAt(index: number) {
  evidences.value = evidences.value.filter((_, position) => position !== index)
}

function setDescription(index: number, description: string) {
  evidences.value = evidences.value.map((evidence, position) =>
    position === index ? { ...evidence, description } : evidence,
  )
}
</script>

<template>
  <section class="pt-1">
    <h2 class="sr-only">Galería de evidencias</h2>

    <button
      type="button"
      class="group flex w-full items-center justify-between rounded border border-white/10 bg-liminal-surface px-4 py-3 text-left outline-none transition-colors hover:border-white/25 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="isOpen = !isOpen"
    >
      <span class="flex items-center gap-3">
        <svg
          aria-hidden="true"
          class="h-4 w-4 text-white/40 transition-colors group-hover:text-liminal-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span
          class="font-mono text-xs font-semibold tracking-wider text-neutral-300 uppercase group-hover:text-white"
        >
          Agregar imágenes a la galería
        </span>
        <span v-if="evidences.length" class="font-mono text-[11px] text-liminal-primary">
          {{ evidences.length }}
        </span>
      </span>

      <svg
        aria-hidden="true"
        class="h-4 w-4 text-white/35 transition-transform group-hover:text-white/60"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-show="isOpen" :id="panelId" class="mt-3 space-y-3">
      <EvidenceDropzone
        multiple
        label="Añadir imágenes"
        hint="PNG, JPG o WEBP · varias a la vez"
        @select="addFiles"
      />

      <ul v-if="evidences.length" class="space-y-3">
        <li
          v-for="(evidence, index) in evidences"
          :key="`${evidence.file.name}-${evidence.file.lastModified}`"
          class="space-y-2"
        >
          <EvidencePreview :file="evidence.file" @remove="removeAt(index)" />

          <label class="sr-only" :for="`${descriptionId}-${index}`">
            Descripción de {{ evidence.file.name }}
          </label>
          <input
            :id="`${descriptionId}-${index}`"
            :value="evidence.description"
            type="text"
            placeholder="Describe esta evidencia..."
            class="w-full rounded border border-white/10 bg-liminal-surface px-3 py-2 font-mono text-xs text-neutral-200 placeholder-white/30 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
            @input="setDescription(index, ($event.target as HTMLInputElement).value)"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
