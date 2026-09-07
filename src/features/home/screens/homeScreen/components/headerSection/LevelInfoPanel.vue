<script setup lang="ts">
import { computed } from 'vue'
import type { Nivel } from '../../data/types'

interface Props {
  nivel: Nivel
}

const props = defineProps<Props>()

const emit = defineEmits<{
  explore: [id: string]
  viewMap: [id: string]
}>()

const clasificacion = computed(() =>
  [props.nivel.clase, props.nivel.estado, props.nivel.entidades].join('  •  '),
)

const materiales = computed(() => props.nivel.materiales.join(' · '))
</script>

<template>
  <div class="flex w-full max-w-[30rem] flex-col items-start gap-6">
    <div class="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-white/70 uppercase">
      <div class="flex items-center gap-2">
        <span class="h-1.5 w-1.5 rounded-full bg-white" />
        <span class="hidden h-px w-8 bg-white/30 sm:inline-block" />
      </div>
      <span>Archivo activo</span>
    </div>

    <div class="flex items-start gap-5 md:gap-7">
      <span
        class="text-7xl leading-none font-extralight tracking-tight text-white/95 select-none md:text-8xl lg:text-[108px]"
      >
        {{ nivel.numero }}
      </span>
      <h1
        class="pt-1 text-3xl leading-[1.08] font-bold tracking-tight text-white md:text-4xl lg:text-[44px]"
      >
        {{ nivel.nombre }}:<br />
        {{ nivel.subtitulo }}
      </h1>
    </div>

    <div class="space-y-1.5 pt-0.5 font-mono">
      <p class="text-xs font-medium tracking-[0.2em] text-neutral-300 uppercase md:text-sm">
        {{ clasificacion }}
      </p>
      <p class="font-sans text-xs tracking-wide text-neutral-400 md:text-sm">
        {{ materiales }}
      </p>
    </div>

    <ul class="m-0 flex list-none flex-wrap gap-2.5 p-0 pt-1">
      <li
        v-for="badge in nivel.badges"
        :key="badge"
        class="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 font-mono text-[11px] tracking-wider text-neutral-200 uppercase md:text-xs"
      >
        {{ badge }}
      </li>
    </ul>

    <div class="flex w-full flex-wrap items-center gap-4 pt-2 sm:w-auto">
      <button
        type="button"
        class="flex items-center justify-center gap-3 rounded-[3px] bg-liminal-primary px-6 py-3.5 text-xs font-bold tracking-wider text-liminal-on-primary uppercase shadow-lg shadow-liminal-primary/10 outline-none transition-all duration-150 hover:bg-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 md:text-sm"
        @click="emit('explore', nivel.id)"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Explorar nivel</span>
      </button>

      <button
        type="button"
        class="flex items-center justify-center gap-3 rounded-[3px] border border-white/25 bg-black/40 px-6 py-3.5 text-xs font-medium tracking-wider text-white uppercase outline-none transition-all duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:text-sm"
        @click="emit('viewMap', nivel.id)"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Ver mapa</span>
      </button>
    </div>
  </div>
</template>
