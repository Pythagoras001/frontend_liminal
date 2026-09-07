<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
})

const emit = defineEmits<{
  prev: []
  next: []
}>()

const sizeClasses = computed(() => (props.size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'))
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      type="button"
      :class="sizeClasses"
      class="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 outline-none transition-all hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      aria-label="Nivel anterior"
      @click="emit('prev')"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      type="button"
      :class="sizeClasses"
      class="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 outline-none transition-all hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      aria-label="Nivel siguiente"
      @click="emit('next')"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>
