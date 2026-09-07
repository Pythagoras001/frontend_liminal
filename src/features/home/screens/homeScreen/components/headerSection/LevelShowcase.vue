<script setup lang="ts">
import type { Nivel } from '../../data/types.ts'
import LevelInfoPanel from './LevelInfoPanel.vue'
import CarouselNavButtons from './CarouselNavButtons.vue'
import LevelCarousel from './LevelCarousel.vue'

interface Props {
  niveles: Nivel[]
  activeLevel: Nivel
}

defineProps<Props>()

const emit = defineEmits<{
  select: [id: string]
  prev: []
  next: []
  explore: [id: string]
  viewMap: [id: string]
}>()
</script>

<template>
  <div class="flex w-full flex-col items-stretch justify-end gap-6 lg:flex-row lg:items-end">
    <LevelInfoPanel
      :nivel="activeLevel"
      @explore="emit('explore', $event)"
      @view-map="emit('viewMap', $event)"
    />

    <div class="hidden flex-shrink-0 xl:mb-6 xl:flex xl:self-end">
      <CarouselNavButtons size="lg" @prev="emit('prev')" @next="emit('next')" />
    </div>

    <div class="ml-auto w-full lg:w-1/2 lg:flex-none">
      <LevelCarousel
        :niveles="niveles"
        :active-id="activeLevel.id"
        @select="emit('select', $event)"
        @prev="emit('prev')"
        @next="emit('next')"
      />
    </div>
  </div>
</template>
