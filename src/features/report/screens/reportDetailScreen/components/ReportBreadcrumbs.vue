<script setup lang="ts">
interface Props {
  nivel: string
  /** Número de expediente ya formateado, ej. "001". */
  archiveNumber: string
}

defineProps<Props>()
</script>

<template>
  <nav aria-label="Ruta de navegación" class="mb-4">
    <ol
      class="flex flex-wrap items-center font-mono text-[11px] tracking-[0.22em] text-white/40 uppercase"
    >
      <li>
        <RouterLink
          :to="{ name: 'reports' }"
          class="rounded outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        >
          Reportes
        </RouterLink>
      </li>
      <li aria-hidden="true" class="mx-2 text-white/20">/</li>
      <li>Nivel {{ nivel }}</li>
      <li aria-hidden="true" class="mx-2 text-white/20">/</li>
      <li aria-current="page" class="text-neutral-400">Archivo {{ archiveNumber }}</li>
    </ol>
  </nav>
</template>
