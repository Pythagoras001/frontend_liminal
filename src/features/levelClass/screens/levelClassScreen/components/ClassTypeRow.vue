<script setup lang="ts">
import { computed } from 'vue'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'
import ClassTypeIcon from './ClassTypeIcon.vue'

interface Props {
  type: string
  /** Número de clases del catálogo que pertenecen a este tipo. */
  count: number
  active?: boolean
  /** Id del listado de clases que esta fila filtra. */
  controlsId: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const emit = defineEmits<{
  select: [type: string]
}>()

const label = computed(() => getSurvivalClassTypeLabel(props.type))
</script>

<template>
  <button
    type="button"
    class="group relative flex w-full items-center justify-between px-3 py-3.5 text-left outline-none transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-liminal-primary"
    :class="active ? 'bg-white/5' : 'hover:bg-white/5'"
    :aria-current="active ? 'true' : undefined"
    :aria-controls="controlsId"
    @click="emit('select', type)"
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
        <ClassTypeIcon :type="type" />
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

    <span class="flex items-center gap-3">
      <span
        class="font-mono text-[10px] tabular-nums transition-colors"
        :class="active ? 'text-emerald-400' : 'text-neutral-600 group-hover:text-neutral-300'"
      >
        {{ count }}
        <span class="sr-only">{{ count === 1 ? 'clase' : 'clases' }}</span>
      </span>
      <span
        aria-hidden="true"
        class="font-mono text-base text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-300"
      >
        ›
      </span>
    </span>
  </button>
</template>
