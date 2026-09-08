<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/features/report/model/Report'
import { formatArchiveDate } from '@/features/shared/utils/formatArchiveDate'

interface Props {
  report: Report
  /** Número de expediente ya formateado, ej. "001". */
  archiveNumber: string
  /**
   * Ofrece la acción de borrado. Quien decide es la pantalla, que es la única
   * que conoce al usuario de la sesión; la cabecera solo pinta lo que le digan.
   */
  canDelete?: boolean
  /** Ofrece la acción de edición, con el mismo criterio que `canDelete`. */
  canEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canDelete: false,
  canEdit: false,
})

const emit = defineEmits<{
  /**
   * Valoración del expediente. `liked` distingue las dos opciones; repetir la
   * misma que ya se emitió la retira, porque el servidor hace el toggle.
   */
  rate: [id: number, liked: boolean]
  /** Petición de borrado; la confirmación la pide la pantalla. */
  delete: [id: number]
  /** Petición de edición; el formulario lo abre la pantalla. */
  edit: [id: number]
}>()

const publishedAt = computed(() => formatArchiveDate(props.report.createdAt))
</script>

<template>
  <header class="flex flex-col justify-between gap-6 pb-6 lg:flex-row lg:items-end">
    <div>
      <p class="mb-2 font-mono text-[11px] tracking-[0.28em] text-white/40 uppercase">
        Reporte de exploración · Archivo {{ archiveNumber }}
      </p>

      <h1
        class="text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl md:text-5xl md:leading-none"
      >
        {{ report.title }}
      </h1>

      <div
        class="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-white/45 uppercase sm:gap-4"
      >
        <span class="text-neutral-300">{{ report.nivel }}</span>
        <span aria-hidden="true" class="text-white/20">|</span>
        <time :datetime="report.createdAt">{{ publishedAt }}</time>
        <span aria-hidden="true" class="text-white/20">|</span>
        <span class="flex items-center gap-2">
          <span
            class="h-4 w-4 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10"
          >
            <img
              v-if="report.author.profileImage"
              :src="report.author.profileImage.thumbnailUrl"
              alt=""
              aria-hidden="true"
              class="h-full w-full object-cover grayscale contrast-125"
            />
          </span>
          <span
            >Publicado por
            <strong class="font-normal text-white">{{ report.author.userName }}</strong></span
          >
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3 self-start lg:self-end">
      <button
        type="button"
        class="flex items-center gap-2 border border-liminal-primary/80 px-5 py-2 font-mono text-xs tracking-[0.12em] text-liminal-primary uppercase outline-none transition-colors hover:bg-liminal-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('rate', report.id, true)"
      >
        <svg
          aria-hidden="true"
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ report.likesCount }} Me gusta</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-2 border border-white/15 px-5 py-2 font-mono text-xs tracking-[0.12em] text-white/60 uppercase outline-none transition-colors hover:border-white/40 hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('rate', report.id, false)"
      >
        <!-- El mismo corazón tachado: la contraparte del botón de al lado. -->
        <svg
          aria-hidden="true"
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M4 20L20 4" stroke-linecap="round" />
        </svg>
        <span>No me gusta</span>
      </button>

      <button
        v-if="canEdit"
        type="button"
        class="flex items-center gap-2 border border-white/15 px-5 py-2 font-mono text-xs tracking-[0.12em] text-white/60 uppercase outline-none transition-colors hover:border-liminal-primary/60 hover:text-liminal-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('edit', report.id)"
      >
        <svg
          aria-hidden="true"
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 14.25v4.5A2.25 2.25 0 0117.25 21H5.25A2.25 2.25 0 013 18.75V6.75A2.25 2.25 0 015.25 4.5h4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Editar</span>
      </button>

      <button
        v-if="canDelete"
        type="button"
        class="flex items-center gap-2 border border-red-500/40 px-5 py-2 font-mono text-xs tracking-[0.12em] text-red-400 uppercase outline-none transition-colors hover:border-red-500/80 hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        @click="emit('delete', report.id)"
      >
        <svg
          aria-hidden="true"
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Eliminar</span>
      </button>
    </div>
  </header>
</template>
