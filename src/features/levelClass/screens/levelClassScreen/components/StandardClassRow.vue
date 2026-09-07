<script setup lang="ts">
import { computed } from 'vue'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import ClassHexBadge from './ClassHexBadge.vue'
import { getSurvivalClassAccent } from './survivalClassAccent'

interface Props {
  levelClass: LevelClass
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
}>()

const hoverTitle = computed(() => getSurvivalClassAccent(props.levelClass.classNumber).hoverTitle)
</script>

<template>
  <button
    type="button"
    class="group flex w-full items-center justify-between px-3 py-3.5 text-left outline-none transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-liminal-primary"
    @click="emit('select', levelClass.id)"
  >
    <span class="flex items-center gap-4">
      <ClassHexBadge :class-number="levelClass.classNumber" />
      <span
        class="w-24 text-xl font-bold tracking-wide text-white uppercase transition-colors"
        :class="hoverTitle"
      >
        {{ levelClass.classNumber }}
      </span>
      <span class="font-mono text-[11px] tracking-wider text-neutral-400 uppercase">
        {{ levelClass.securityLevel }}
      </span>
    </span>

    <span
      aria-hidden="true"
      class="font-mono text-base text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-300"
    >
      ›
    </span>
  </button>
</template>
