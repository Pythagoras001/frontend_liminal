<script setup lang="ts">
import { computed } from 'vue'
import { buildPaginationItems, PAGINATION_GAP } from './paginationItems'

interface Props {
  page: number
  pageSize: number
  total: number
  totalPages: number
  /** Reportes realmente visibles tras aplicar la búsqueda de la barra. */
  visibleCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const items = computed(() => buildPaginationItems(props.page, props.totalPages))

/** Primer índice global de la página; queda en 0 si la búsqueda no deja nada. */
const rangeStart = computed(() => (props.visibleCount ? (props.page - 1) * props.pageSize + 1 : 0))
const rangeEnd = computed(() => rangeStart.value + Math.max(props.visibleCount - 1, 0))

const canGoBack = computed(() => props.page > 1)
const canGoForward = computed(() => props.page < props.totalPages)

const PAGE_CLASS =
  'flex h-8 w-8 items-center justify-center rounded font-mono text-xs outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary'
const INACTIVE_PAGE_CLASS =
  'border border-white/10 text-white/60 hover:border-white/25 hover:text-white'
const ACTIVE_PAGE_CLASS = 'bg-liminal-primary font-bold text-liminal-on-primary'
const STEP_CLASS =
  'border border-white/10 text-white/50 hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-white/50'

function goTo(page: number) {
  if (page !== props.page && page >= 1 && page <= props.totalPages) {
    emit('update:page', page)
  }
}
</script>

<template>
  <nav
    aria-label="Navegación de páginas del archivo"
    class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row"
  >
    <p class="font-mono text-xs tracking-[0.12em] text-white/40 uppercase">
      Mostrando {{ rangeStart }}–{{ rangeEnd }} de {{ total }}
    </p>

    <ul class="flex items-center gap-1.5">
      <li>
        <button
          type="button"
          :class="[PAGE_CLASS, STEP_CLASS]"
          :disabled="!canGoBack"
          aria-label="Página anterior"
          @click="goTo(page - 1)"
        >
          <svg
            aria-hidden="true"
            class="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </li>

      <li v-for="(item, index) in items" :key="item === PAGINATION_GAP ? `gap-${index}` : item">
        <span
          v-if="item === PAGINATION_GAP"
          aria-hidden="true"
          class="block w-6 text-center text-white/30"
        >
          …
        </span>
        <button
          v-else
          type="button"
          :class="[PAGE_CLASS, item === page ? ACTIVE_PAGE_CLASS : INACTIVE_PAGE_CLASS]"
          :aria-current="item === page ? 'page' : undefined"
          :aria-label="`Ir a la página ${item}`"
          @click="goTo(item)"
        >
          {{ item }}
        </button>
      </li>

      <li>
        <button
          type="button"
          :class="[PAGE_CLASS, STEP_CLASS]"
          :disabled="!canGoForward"
          aria-label="Página siguiente"
          @click="goTo(page + 1)"
        >
          <svg
            aria-hidden="true"
            class="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </li>
    </ul>

    <p class="font-mono text-xs tracking-[0.12em] text-white/40 uppercase">
      {{ pageSize }} por página
    </p>
  </nav>
</template>
