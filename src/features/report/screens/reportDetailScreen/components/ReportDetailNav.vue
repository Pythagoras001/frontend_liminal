<script setup lang="ts">
const emit = defineEmits<{
  next: []
}>()

const LINK_CLASS =
  'inline-flex items-center gap-2 rounded font-mono text-xs tracking-[0.14em] text-white/50 uppercase outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary'
</script>

<template>
  <nav
    aria-label="Navegación entre reportes"
    class="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-5"
  >
    <RouterLink :to="{ name: 'reports' }" :class="LINK_CLASS">
      <span aria-hidden="true">←</span>
      <span>Volver a reportes</span>
    </RouterLink>

    <button type="button" :class="LINK_CLASS" @click="emit('next')">
      <span>Siguiente reporte</span>
      <span aria-hidden="true">→</span>
    </button>
  </nav>
</template>
