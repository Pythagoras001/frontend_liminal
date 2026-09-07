<script setup lang="ts">
interface Props {
  label: string
  /** Id del control que etiqueta. Sin él la etiqueta no es clicable ni asociada. */
  controlId?: string
  /** Mensaje de validación mostrado bajo el control. */
  error?: string
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-2">
    <!-- Sin `controlId` el control no es un único elemento (ej. una zona de
         carga), así que la etiqueta se asocia envolviéndolo desde fuera. -->
    <label
      v-if="controlId"
      :for="controlId"
      class="block font-mono text-xs font-medium tracking-wider text-white/50 uppercase"
    >
      {{ label }}
    </label>
    <p v-else class="block font-mono text-xs font-medium tracking-wider text-white/50 uppercase">
      {{ label }}
    </p>

    <slot />

    <p v-if="error" role="alert" class="font-mono text-xs text-red-400">{{ error }}</p>
  </div>
</template>
