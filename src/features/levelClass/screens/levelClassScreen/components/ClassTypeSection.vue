<script setup lang="ts">
import type { SurvivalClassTypeOption } from '@/features/levelClass/hooks/useSurvivalClassTypeFilter'
import ClassTypeRow from './ClassTypeRow.vue'

interface Props {
  types: SurvivalClassTypeOption[]
  /** Tipo cuyas clases se están mostrando en el listado. */
  activeType: string | null
  /** Id del listado de clases que este filtro controla. */
  controlsId: string
}

defineProps<Props>()

const emit = defineEmits<{
  select: [type: string]
  learnMore: []
}>()
</script>

<template>
  <section
    class="relative flex flex-col border-white/10 lg:col-span-5 lg:border-l lg:pl-6"
    aria-labelledby="tipos-clase-titulo"
  >
    <div>
      <h2
        id="tipos-clase-titulo"
        class="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl"
      >
        TIPOS DE CLASES
      </h2>
      <p class="mt-2 font-mono text-xs tracking-[0.2em] text-white/50 uppercase md:text-sm">
        Elige un tipo para ver únicamente las clases clasificadas bajo ese criterio.
      </p>
    </div>

    <div class="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
      <ClassTypeRow
        v-for="option in types"
        :key="option.type"
        :type="option.type"
        :count="option.count"
        :active="option.type === activeType"
        :controls-id="controlsId"
        @select="emit('select', $event)"
      />
    </div>

    <div class="mt-8 flex justify-end">
      <button
        type="button"
        class="group inline-flex items-center gap-2 rounded font-mono text-xs font-bold tracking-[0.14em] text-liminal-primary uppercase outline-none transition-colors hover:text-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('learnMore')"
      >
        <span>Conocer el sistema de clasificación</span>
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  </section>
</template>
