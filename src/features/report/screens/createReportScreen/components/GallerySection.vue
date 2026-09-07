<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import EvidenceDropzone from './EvidenceDropzone.vue'
import EvidencePreview from './EvidencePreview.vue'

const files = defineModel<File[]>({ required: true })

const panelId = useId()
/** Arranca plegada, como en el diseño; se abre al añadir imágenes. */
const isOpen = shallowRef(false)

function addFiles(added: File[]) {
  files.value = [...files.value, ...added]
}

function removeAt(index: number) {
  files.value = files.value.filter((_, position) => position !== index)
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
        <span v-if="files.length" class="font-mono text-[11px] text-liminal-primary">
          {{ files.length }}
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

      <ul v-if="files.length" class="space-y-2">
        <li v-for="(file, index) in files" :key="`${file.name}-${file.lastModified}`">
          <EvidencePreview :file="file" @remove="removeAt(index)" />
        </li>
      </ul>
    </div>
  </section>
</template>
