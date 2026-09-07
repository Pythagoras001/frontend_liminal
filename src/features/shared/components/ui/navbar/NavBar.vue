<script setup lang="ts">
interface Props {
  /** Etiqueta del botón de filtro, ej. "Todos los niveles". */
  filterLabel?: string
  /** Sector mostrado en la telemetría central, ej. "Sector Alpha". */
  sector?: string
  /** Terminal mostrado en la telemetría central, ej. "Terminal 09". */
  terminal?: string
  /** Nombre mostrado junto al avatar del usuario. */
  explorerName?: string
  /** URL del avatar del explorador. */
  avatarUrl?: string
}

withDefaults(defineProps<Props>(), {
  filterLabel: 'Todos los niveles',
  sector: 'Sector Alpha',
  terminal: 'Terminal 09',
  explorerName: 'Explorador',
  avatarUrl: undefined,
})

const emit = defineEmits<{
  filterClick: []
  searchClick: []
  menuClick: []
}>()
</script>

<template>
  <header class="flex w-full items-center justify-between gap-4 px-5 pt-8 pb-4 md:px-12">
    <div class="flex items-center gap-6">
      <span class="text-xl font-bold tracking-[0.28em] text-white uppercase md:text-2xl"
        >LIMINAL</span
      >
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-all duration-200 outline-none hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:text-sm"
        @click="emit('filterClick')"
      >
        {{ filterLabel }}
      </button>
    </div>

    <div
      class="hidden items-center gap-2 font-mono text-xs tracking-wider text-white/80 md:flex md:text-sm"
      aria-hidden="true"
    >
      <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      <span>{{ sector }} · {{ terminal }}</span>
    </div>

    <div class="flex items-center gap-5 md:gap-6">
      <div class="flex items-center gap-3">
        <div
          class="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-white/30 bg-neutral-800 md:h-9 md:w-9"
        >
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt=""
            class="h-full w-full object-cover grayscale contrast-125"
          />
        </div>
        <span class="hidden text-xs font-medium tracking-wide text-white/90 md:inline md:text-sm">
          {{ explorerName }}
        </span>
      </div>

      <button
        type="button"
        class="rounded p-1.5 text-white/80 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        aria-label="Buscar archivo"
        @click="emit('searchClick')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        class="rounded p-1.5 text-white/80 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        aria-label="Menú principal"
        @click="emit('menuClick')"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </header>
</template>
