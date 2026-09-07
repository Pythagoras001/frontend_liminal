<script setup lang="ts">
import type { LevelClass } from '@/features/levelClass/model/LevelClass'

interface Props {
  levelClass: LevelClass
}

defineProps<Props>()
</script>

<template>
  <!-- Marco hexagonal decorativo; el icono de la clase va centrado dentro. -->
  <span
    class="relative inline-flex h-14 w-12 flex-shrink-0 items-center justify-center text-liminal-primary drop-shadow-[0_0_6px_rgba(255,184,0,0.35)]"
  >
    <svg aria-hidden="true" class="absolute inset-0 h-full w-full" viewBox="0 0 48 56" fill="none">
      <polygon
        points="24,2 45,14.5 45,41.5 24,54 3,41.5 3,14.5"
        class="fill-liminal-primary/10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>

    <img
      :src="levelClass.iconImage.thumbnailUrl"
      alt=""
      aria-hidden="true"
      width="28"
      height="28"
      class="relative h-7 w-7 object-contain object-center"
    />
  </span>
</template>
