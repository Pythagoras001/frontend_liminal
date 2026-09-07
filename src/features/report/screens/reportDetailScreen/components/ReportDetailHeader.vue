<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/features/report/model/Report'
import { formatArchiveDate } from '@/features/shared/utils/formatArchiveDate'

interface Props {
  report: Report
  /** Número de expediente ya formateado, ej. "001". */
  archiveNumber: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  like: [id: number]
  options: [id: number]
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
        {{ report.description }}
      </h1>

      <div
        class="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-white/45 uppercase sm:gap-4"
      >
        <span class="text-neutral-300">Nivel {{ report.nivel }}</span>
        <span aria-hidden="true" class="text-white/20">|</span>
        <time :datetime="report.createdAt">{{ publishedAt }}</time>
        <span aria-hidden="true" class="text-white/20">|</span>
        <span class="flex items-center gap-2">
          <span
            class="h-4 w-4 flex-shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10"
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
        @click="emit('like', report.id)"
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
        aria-label="Más acciones sobre el reporte"
        class="border border-white/10 px-3.5 py-2 font-mono text-sm tracking-[0.12em] text-white/50 outline-none transition-colors hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('options', report.id)"
      >
        <span aria-hidden="true">···</span>
      </button>
    </div>
  </header>
</template>
