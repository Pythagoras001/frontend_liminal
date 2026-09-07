<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { getClassNumberLabel, type LevelClass } from '@/features/levelClass/model/LevelClass'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'
import StandardClassCard from './StandardClassCard.vue'
import StandardClassRow from './StandardClassRow.vue'

interface Props {
  classes: LevelClass[]
  classType: string | null
  listId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  viewLevels: [id: number]
}>()

const expandedId = shallowRef<number | null>(null)
const activeId = computed(() => expandedId.value ?? props.classes[0]?.id ?? null)
const hasUserExpanded = shallowRef(false)

function expandClass(id: number) {
  if (id === activeId.value) return

  expandedId.value = id
  hasUserExpanded.value = true
  emit('select', id)
}

watch(
  () => props.classes,
  () => {
    expandedId.value = null
    hasUserExpanded.value = false
  },
)

const typeLabel = computed(() =>
  props.classType === null ? 'Sin tipo' : getSurvivalClassTypeLabel(props.classType),
)

/** Número de la clase abierta; se muestra junto al título del listado. */
const activeClassNumber = computed(() => {
  const active = props.classes.find((levelClass) => levelClass.id === activeId.value)

  return active === undefined ? '' : getClassNumberLabel(active.classNumber)
})
</script>

<template>
  <section class="flex flex-col lg:col-span-7" aria-labelledby="clases-listado-titulo">
    <div class="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
      <h2
        id="clases-listado-titulo"
        aria-live="polite"
        class="font-mono text-xs font-semibold tracking-[0.22em] text-neutral-400 uppercase"
      >
        Clases · {{ typeLabel }}
      </h2>
      <span v-if="activeClassNumber" class="font-mono text-[10px] text-neutral-600 uppercase">{{
        activeClassNumber
      }}</span>
    </div>

    <p
      v-if="classes.length === 0"
      :id="listId"
      class="border-t border-b border-white/10 px-3 py-6 font-mono text-xs text-neutral-500 uppercase"
    >
      No hay clases registradas para este tipo.
    </p>

    <div
      v-else
      :id="listId"
      class="flex flex-col divide-y divide-white/10 border-t border-b border-white/10"
    >
      <Transition
        v-for="levelClass in classes"
        :key="levelClass.id"
        enter-active-class="transition-[opacity,transform] duration-200 ease-out"
        enter-from-class="-translate-y-1.5 opacity-0"
      >
        <StandardClassCard
          v-if="levelClass.id === activeId"
          :level-class="levelClass"
          :autofocus-header="hasUserExpanded"
          @view-levels="emit('viewLevels', $event)"
        />
        <StandardClassRow v-else :level-class="levelClass" @expand="expandClass" />
      </Transition>
    </div>
  </section>
</template>
