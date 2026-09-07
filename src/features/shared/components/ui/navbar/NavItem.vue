<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  label: string
  /** Destino de navegación. Sin él, el ítem actúa como botón y emite `click`. */
  to?: RouteLocationRaw
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

/** Compartido por las dos variantes para que enlace y botón se vean igual. */
const ITEM_CLASS =
  'text-sm font-semibold tracking-[0.15em] text-white/90 uppercase outline-none transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary'
</script>

<template>
  <!-- RouterLink marca la ruta activa y añade `aria-current="page"` por su cuenta. -->
  <RouterLink v-if="to" :to="to" :class="ITEM_CLASS" active-class="text-liminal-primary">
    {{ label }}
  </RouterLink>

  <button v-else type="button" :class="ITEM_CLASS" @click="emit('click')">
    {{ label }}
  </button>
</template>
