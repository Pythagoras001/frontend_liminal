<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'
import StandardClassCard from './StandardClassCard.vue'
import StandardClassRow from './StandardClassRow.vue'
import { getClassDigit } from './survivalClassAccent'

interface Props {
  classes: LevelClass[]
  /** Tipo al que pertenecen las clases recibidas; encabeza el listado. */
  classType: string | null
  /** Id del contenedor, referenciado por el filtro de tipos. */
  listId: string
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

/**
 * Al cambiar de tipo el acordeón vuelve a su estado inicial: la clase expandida
 * anterior ya no está en la lista y el foco debe quedarse en el filtro.
 */
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

/** Rango de la escala numérica; los tipos especiales no siguen ninguna. */
const scaleLabel = computed(() => {
  const digits = props.classes
    .map((levelClass) => getClassDigit(levelClass.classNumber))
    .filter((digit) => digit !== '')
    .map(Number)

  if (digits.length === 0) return 'Sin escala'

  const min = Math.min(...digits)
  const max = Math.max(...digits)

  return min === max ? `Sector: ${min}` : `Sector: ${min}-${max}`
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
      <span class="font-mono text-[10px] text-neutral-600 uppercase">{{ scaleLabel }}</span>
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
