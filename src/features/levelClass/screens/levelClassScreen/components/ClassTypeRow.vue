<script setup lang="ts">
import { computed } from 'vue'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'
import ClassTypeIcon from './ClassTypeIcon.vue'

interface Props {
  levelClass: LevelClass
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const emit = defineEmits<{
  select: [id: number]
}>()

const label = computed(() => getSurvivalClassTypeLabel(props.levelClass.type))
</script>

<template>
  <button
    type="button"
    class="group relative flex w-full items-center justify-between px-3 py-3.5 text-left outline-none transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-liminal-primary"
    :class="active ? 'bg-white/5' : 'hover:bg-white/5'"
    :aria-current="active ? 'true' : undefined"
    @click="emit('select', levelClass.id)"
  >
    <span
      v-if="active"
      aria-hidden="true"
      class="absolute top-0 bottom-0 left-0 w-0.5 bg-emerald-400"
    />

    <span class="flex items-center gap-4 pl-1">
      <span
        class="flex h-6 w-6 items-center justify-center transition-colors"
        :class="active ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-white'"
      >
        <ClassTypeIcon :type="levelClass.type" />
      </span>
      <span
        class="font-mono text-xs tracking-[0.2em] uppercase transition-colors"
        :class="
          active
            ? 'font-semibold text-white group-hover:text-emerald-300'
            : 'text-neutral-300 group-hover:text-white'
        "
      >
        {{ label }}
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
