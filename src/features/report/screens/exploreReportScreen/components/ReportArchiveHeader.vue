<script setup lang="ts">
const emit = defineEmits<{
  create: []
}>()
</script>

<template>
  <header class="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div class="space-y-1.5">
      <p class="font-mono text-[11px] tracking-[0.28em] text-white/40 uppercase">
        Archivo comunitario
      </p>
      <h1 class="text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl md:text-5xl">
        Reportes de exploración
      </h1>
      <p class="font-mono text-xs tracking-[0.12em] text-white/50 md:text-sm">
        Registros documentados por exploradores de la comunidad.
      </p>
    </div>

    <button
      type="button"
      class="inline-flex flex-shrink-0 items-center gap-2 self-start rounded border border-liminal-primary px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.12em] text-liminal-primary uppercase outline-none transition-colors duration-200 hover:bg-liminal-primary hover:text-liminal-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:self-auto"
      @click="emit('create')"
    >
      <span aria-hidden="true" class="text-base leading-none font-bold">+</span>
      <span>Crear reporte</span>
    </button>
  </header>
</template>
