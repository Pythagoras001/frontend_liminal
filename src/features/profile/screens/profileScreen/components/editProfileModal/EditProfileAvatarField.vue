<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import { useObjectUrl } from '@/features/shared/hooks/useObjectUrl'

interface Props {
  /** Avatar guardado en el servidor; se muestra mientras no se elija otro. */
  currentImageUrl?: string
}

const props = defineProps<Props>()

/** Fichero elegido en el navegador, aún sin subir. `null` = no se cambia. */
const avatar = defineModel<File | null>({ required: true })

/** Formatos y tamaño que acepta la carga, según el diseño. */
const ACCEPTED_TYPES = 'image/png, image/jpeg, image/webp'
const MAX_SIZE_BYTES = 5 * 1024 * 1024

const inputId = useId()
const error = shallowRef<string>()

const previewUrl = useObjectUrl(avatar)
const shownUrl = computed(() => previewUrl.value ?? props.currentImageUrl)

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  // Se limpia para que volver a elegir el mismo fichero dispare `change`.
  input.value = ''

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    error.value = 'El archivo debe ser una imagen.'
    return
  }

  if (file.size > MAX_SIZE_BYTES) {
    error.value = 'La imagen supera los 5 MB permitidos.'
    return
  }

  error.value = undefined
  avatar.value = file
}
</script>

<template>
  <div class="space-y-3">
    <p class="block font-mono text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
      Foto de perfil
    </p>

    <div class="flex items-center gap-5">
      <div
        class="h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-neutral-900 p-0.5"
      >
        <img
          v-if="shownUrl"
          :src="shownUrl"
          alt="Avatar actual"
          class="h-full w-full rounded-full object-cover contrast-110"
        />

        <!-- Silueta por defecto mientras el explorador no tenga fotografía. -->
        <svg
          v-else
          aria-hidden="true"
          class="h-full w-full text-white/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
        >
          <path
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="space-y-1.5">
        <label
          :for="inputId"
          class="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs tracking-wider text-neutral-200 transition-colors hover:border-white/40 hover:bg-white/[0.07] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-liminal-primary"
        >
          <svg
            aria-hidden="true"
            class="h-3.5 w-3.5 text-liminal-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="uppercase">Cambiar foto</span>

          <input
            :id="inputId"
            type="file"
            class="sr-only"
            :accept="ACCEPTED_TYPES"
            @change="onChange"
          />
        </label>

        <p class="font-mono text-[11px] tracking-wide text-white/40">PNG, JPG o WEBP. Máx 5MB.</p>

        <!-- El nombre del fichero confirma qué imagen se subirá al guardar. -->
        <p v-if="avatar" class="flex items-center gap-2 font-mono text-[11px] text-white/60">
          <span class="max-w-[14rem] truncate">{{ avatar.name }}</span>
          <button
            type="button"
            class="rounded-sm border border-white/10 px-1.5 py-0.5 tracking-wider text-white/50 uppercase outline-none transition-colors hover:border-red-500/50 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
            @click="avatar = null"
          >
            Quitar
          </button>
        </p>
      </div>
    </div>

    <p v-if="error" role="alert" class="font-mono text-xs text-red-400">{{ error }}</p>
  </div>
</template>
