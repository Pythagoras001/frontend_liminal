<script setup lang="ts">
import type { Nivel } from '../../data/types'

interface Props {
  nivel: Nivel
  activo: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <button
    type="button"
    class="group flex w-44 shrink-0 flex-col gap-2 rounded-xl text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:w-52"
    :aria-pressed="activo"
    @click="emit('select', nivel.id)"
  >
    <span
      class="pl-1 font-mono text-xs transition-colors"
      :class="
        activo ? 'font-semibold text-liminal-primary' : 'text-white/60 group-hover:text-white/90'
      "
    >
      {{ nivel.numero }}
    </span>

    <span
      class="relative block aspect-9/16 w-full overflow-hidden rounded-xl border bg-neutral-900 transition-all duration-300"
      :class="
        activo
          ? 'border-2 border-liminal-primary shadow-lg shadow-liminal-primary/10 ring-1 ring-liminal-primary/40'
          : 'border-white/10 group-hover:border-white/30'
      "
    >
      <img
        :src="nivel.imgCardExpo"
        alt=""
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700"
        :class="activo ? 'scale-105' : 'brightness-90 group-hover:scale-105'"
      />
      <span class="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
      <span
        class="absolute inset-x-0 bottom-4 text-center font-sans text-sm text-white"
        :class="activo ? 'font-semibold' : 'font-medium'"
      >
        {{ nivel.nombre }}
      </span>
    </span>
  </button>
</template>
