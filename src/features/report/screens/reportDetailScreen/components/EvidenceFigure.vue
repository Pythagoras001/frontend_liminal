<script setup lang="ts">
import { computed } from 'vue'
import type { Evidence } from '@/features/report/model/Evidence'

interface Props {
  evidence: Evidence
  /** Posición dentro del expediente: 1 es la evidencia principal. */
  index: number
  /** Etiqueta de la evidencia, ej. "Evidencia principal". */
  label: string
}

const props = defineProps<Props>()

const number = computed(() => String(props.index).padStart(2, '0'))

const caption = computed(() => props.evidence.description ?? 'Sin descripción registrada.')
</script>

<template>
  <figure class="group">
    <div class="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
      <img
        :src="evidence.image.mediumUrl"
        :alt="caption"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      <a
        :href="evidence.image.originalUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Abrir la evidencia ${number} a tamaño completo`"
        class="absolute right-3 bottom-3 border border-white/20 bg-black/60 p-2 text-white/80 backdrop-blur outline-none transition-colors hover:border-liminal-primary hover:text-liminal-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
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
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>

    <figcaption class="mt-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
        {{ label }} / {{ number }}
      </span>
      <p class="mt-0.5 text-xs text-neutral-300">{{ caption }}</p>
    </figcaption>
  </figure>
</template>
