<script setup lang="ts">
import { computed } from 'vue'
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

/** La primera clase de la escala se muestra destacada; el resto como lista compacta. */
const featuredClass = computed(() => props.classes[0])
const compactClasses = computed(() => props.classes.slice(1))
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

    <StandardClassCard
      v-if="featuredClass"
      :level-class="featuredClass"
      @view-levels="emit('viewLevels', $event)"
    />

    <div class="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
      <StandardClassRow
        v-for="levelClass in compactClasses"
        :key="levelClass.id"
        :level-class="levelClass"
        @select="emit('select', $event)"
      />
    </div>
  </section>
</template>
