<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { ACCEPTED_IMAGE_TYPES } from '../data/reportFormOptions'

interface Props {
  /** Permite soltar y elegir varias imágenes a la vez. */
  multiple?: boolean
  label?: string
  hint?: string
}

withDefaults(defineProps<Props>(), {
  multiple: false,
  label: 'Seleccionar imagen',
  hint: 'PNG, JPG o WEBP',
})

const emit = defineEmits<{
  select: [files: File[]]
}>()

const inputId = useId()
const isDragging = shallowRef(false)

/** Solo se aceptan imágenes: el resto de ficheros soltados se descartan. */
function emitImages(list: FileList | null | undefined): void {
  if (!list?.length) {
    return
  }
  const images = Array.from(list).filter((file) => file.type.startsWith('image/'))
  if (images.length) {
    emit('select', images)
  }
}

function onDrop(event: DragEvent) {
  isDragging.value = false
  emitImages(event.dataTransfer?.files)
}

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  emitImages(input.files)
  // Se limpia para que volver a elegir el mismo fichero dispare `change`.
  input.value = ''
}
</script>

<template>
  <label
    :for="inputId"
    class="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors focus-within:border-liminal-primary focus-within:ring-1 focus-within:ring-liminal-primary hover:border-liminal-primary/70 hover:bg-white/[0.03]"
    :class="
      isDragging
        ? 'border-liminal-primary bg-liminal-primary/5'
        : 'border-white/15 bg-liminal-surface/60'
    "
    @dragover.prevent="isDragging = true"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <span
      aria-hidden="true"
      class="mb-3 text-white/40 transition-colors group-hover:text-liminal-primary"
    >
      <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <span
      class="font-mono text-xs font-semibold tracking-wider text-neutral-200 uppercase group-hover:text-white"
    >
      {{ label }}
    </span>
    <span class="mt-1 font-mono text-[11px] tracking-wider text-white/35 uppercase">
      {{ hint }}
    </span>

    <input
      :id="inputId"
      type="file"
      class="sr-only"
      :accept="ACCEPTED_IMAGE_TYPES"
      :multiple="multiple"
      @change="onChange"
    />
  </label>
</template>
