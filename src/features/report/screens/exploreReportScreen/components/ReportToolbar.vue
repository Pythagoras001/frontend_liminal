<script setup lang="ts">
interface Props {
  /** Total de reportes del archivo, no solo los de la página actual. */
  total: number
  /** Id de la rejilla que la búsqueda filtra, para enlazarla con `aria-controls`. */
  controlsId: string
}

defineProps<Props>()

const search = defineModel<string>('search', { required: true })
</script>

<template>
  <section class="mb-7 border-b border-white/10 pb-4">
    <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative w-full sm:w-72 md:w-80">
          <label class="sr-only" for="report-search">Buscar por título o nivel</label>
          <span
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/35"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            id="report-search"
            v-model="search"
            type="search"
            :aria-controls="controlsId"
            placeholder="Buscar por título o nivel"
            class="w-full rounded border border-white/10 bg-liminal-surface py-2 pr-3 pl-9 font-mono text-xs text-white placeholder-white/35 outline-none transition-colors focus:border-liminal-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
          />
        </div>
      </div>

      <p class="font-mono text-xs tracking-[0.12em] text-white/40 uppercase lg:text-right">
        {{ total }} {{ total === 1 ? 'reporte' : 'reportes' }}
      </p>
    </div>
  </section>
</template>
