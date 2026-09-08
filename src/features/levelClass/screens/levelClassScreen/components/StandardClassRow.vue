<script setup lang="ts">
import { getClassNumberLabel, type LevelClass } from '@/features/levelClass/model/LevelClass'
import { DEFAULT_ACCENT } from './survivalClassAccent'

interface Props {
  levelClass: LevelClass
}

defineProps<Props>()

const emit = defineEmits<{
  expand: [id: number]
}>()

const hoverTitle = DEFAULT_ACCENT.hoverTitle
</script>

<template>
  <h3>
    <button
      type="button"
      class="group flex w-full items-center justify-between px-3 py-3.5 text-left outline-none transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-liminal-primary"
      :aria-expanded="false"
      @click="emit('expand', levelClass.id)"
    >
      <span class="flex min-w-0 flex-1 items-center gap-4">
        <img
          :src="levelClass.iconImage.thumbnailUrl"
          alt=""
          aria-hidden="true"
          width="48"
          height="48"
          class="h-12 w-12 shrink-0 object-contain object-center"
        />
        <span
          class="min-w-28 text-xl font-bold tracking-wide whitespace-nowrap text-white uppercase transition-colors"
          :class="hoverTitle"
        >
          {{ getClassNumberLabel(levelClass.classNumber) }}
        </span>
        <span
          class="ml-auto pl-4 text-right font-mono text-[11px] tracking-wider text-neutral-400 uppercase"
        >
          {{ levelClass.securityLevel }}
        </span>
      </span>

      <span
        aria-hidden="true"
        class="shrink-0 pl-4 font-mono text-base text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-300"
      >
        ›
      </span>
    </button>
  </h3>
</template>
