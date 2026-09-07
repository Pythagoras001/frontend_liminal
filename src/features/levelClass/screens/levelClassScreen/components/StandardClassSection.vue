<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import StandardClassCard from './StandardClassCard.vue'
import StandardClassRow from './StandardClassRow.vue'

interface Props {
  classes: LevelClass[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  viewLevels: [id: number]
}>()

const expandedId = shallowRef<number | null>(null)

/** Sin expansión explícita queda desplegada la primera clase, como en el diseño. */
const activeId = computed(() => expandedId.value ?? props.classes[0]?.id ?? null)

/**
 * Solo se devuelve el foco al encabezado cuando la expansión viene de un clic;
 * en el primer render el foco debe quedarse donde está.
 */
const hasUserExpanded = shallowRef(false)

function expandClass(id: number) {
  if (id === activeId.value) return

  expandedId.value = id
  hasUserExpanded.value = true
  emit('select', id)
}
</script>

<template>
  <section class="flex flex-col lg:col-span-7" aria-labelledby="clases-estandar-titulo">
    <div class="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
      <h2
        id="clases-estandar-titulo"
        class="font-mono text-xs font-semibold tracking-[0.22em] text-neutral-400 uppercase"
      >
        Clases estándar
      </h2>
      <span class="font-mono text-[10px] text-neutral-600 uppercase">Sector: 0-5</span>
    </div>

    <div class="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
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
