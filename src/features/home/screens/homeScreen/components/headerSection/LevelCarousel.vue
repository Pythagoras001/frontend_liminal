<script setup lang="ts">
import type { Nivel } from '../../data/types.ts'
import LevelCard from './LevelCard.vue'
import CarouselNavButtons from './CarouselNavButtons.vue'

interface Props {
  niveles: Nivel[]
  activeId: string
}

defineProps<Props>()

const emit = defineEmits<{
  select: [id: string]
  prev: []
  next: []
}>()
</script>

<template>
  <div class="flex w-full flex-col overflow-hidden">
    <div class="flex items-center justify-end gap-3 pr-2 pb-3">
      <span class="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">Otros niveles</span>
      <div class="flex items-center gap-2">
        <span class="hidden h-px w-8 bg-white/30 sm:inline-block" />
        <span class="h-1.5 w-1.5 rounded-full bg-white" />
      </div>
    </div>

    <div class="flex items-center gap-3 pb-3 xl:hidden">
      <CarouselNavButtons size="sm" @prev="emit('prev')" @next="emit('next')" />
    </div>

    <ul
      class="m-0 flex list-none items-stretch gap-6 overflow-x-auto p-0 pt-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <li v-for="nivel in niveles" :key="nivel.id">
        <LevelCard
          :nivel="nivel"
          :activo="nivel.id === activeId"
          @select="emit('select', $event)"
        />
      </li>
    </ul>
  </div>
</template>
