<script setup lang="ts">
import { computed } from 'vue'
import { getClassDigit, getSurvivalClassAccent } from './survivalClassAccent'

interface Props {
  classNumber: string
  size?: 'sm' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
})

const digit = computed(() => getClassDigit(props.classNumber))

const accent = computed(() => getSurvivalClassAccent(props.classNumber).accent)

const isLarge = computed(() => props.size === 'lg')
</script>

<template>
  <!-- Decorativo: el número ya aparece en el título de la clase. -->
  <div
    aria-hidden="true"
    class="relative flex flex-shrink-0 items-center justify-center"
    :class="[accent, isLarge ? 'h-14 w-12' : 'h-9 w-8']"
  >
    <svg class="absolute inset-0 h-full w-full fill-none stroke-current" viewBox="0 0 100 115">
      <polygon
        points="50,2 96,27 96,88 50,113 4,88 4,27"
        stroke-linejoin="round"
        :stroke-width="isLarge ? 5 : 7"
      />
    </svg>
    <span
      class="font-bold"
      :class="isLarge ? 'pt-0.5 text-3xl drop-shadow-[0_0_8px_currentColor]' : 'text-lg'"
    >
      {{ digit }}
    </span>
  </div>
</template>
