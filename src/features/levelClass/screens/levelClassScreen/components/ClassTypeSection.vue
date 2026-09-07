<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import ClassTypeRow from './ClassTypeRow.vue'

interface Props {
  classes: LevelClass[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
  learnMore: []
}>()

const selectedId = shallowRef<number | null>(null)

/** Sin selección explícita queda marcado el primer tipo, como en el diseño. */
const activeId = computed(() => selectedId.value ?? props.classes[0]?.id ?? null)

function selectType(id: number) {
  selectedId.value = id
  emit('select', id)
}
</script>

<template>
  <section
    class="relative flex flex-col border-white/10 lg:col-span-5 lg:border-l lg:pl-6"
    aria-labelledby="tipos-clase-titulo"
  >
    <span
      aria-hidden="true"
      class="pointer-events-none absolute top-0 right-0 hidden pr-2 text-right font-mono text-[10px] leading-tight text-neutral-400 opacity-20 select-none lg:block"
    >
      MÁS<br />ALLÁ<br />TAMBIÉN<br />EXISTE
    </span>

    <div class="mb-5 pt-0.5">
      <h2
        id="tipos-clase-titulo"
        class="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl"
      >
        Tipos de clase
      </h2>
      <p class="mt-2 text-xs leading-relaxed text-neutral-400">
        Clasificaciones especiales para riesgos que no siguen una escala numérica.
      </p>
    </div>

    <div class="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
      <ClassTypeRow
        v-for="levelClass in classes"
        :key="levelClass.id"
        :level-class="levelClass"
        :active="levelClass.id === activeId"
        @select="selectType"
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
