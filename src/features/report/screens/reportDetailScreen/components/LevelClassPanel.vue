<script setup lang="ts">
import { computed } from 'vue'
import type { Author } from '@/features/report/model/Author'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'

interface Props {
  levelClass: LevelClass
  author: Author
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewClass: [id: number]
}>()

/** Ficha técnica de la clase: mismo orden que el expediente impreso. */
const specs = computed(() => [
  { label: 'Tipo', value: getSurvivalClassTypeLabel(props.levelClass.type), highlight: false },
  { label: 'Seguridad', value: props.levelClass.securityLevel, highlight: true },
  { label: 'Estado', value: props.levelClass.legitimacy, highlight: true },
  { label: 'Peligro', value: props.levelClass.dangerLevel, highlight: true },
])
</script>

<template>
  <section aria-labelledby="clasificacion-titulo" class="border-l border-white/10 pl-6 lg:pl-7">
    <div class="mb-6 flex items-center gap-4">
      <img
        :src="levelClass.iconImage.thumbnailUrl"
        alt=""
        aria-hidden="true"
        width="48"
        height="48"
        class="h-12 w-12 shrink-0 object-contain object-center"
      />

      <div>
        <span class="block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
          Clasificación
        </span>
        <h2
          id="clasificacion-titulo"
          class="text-xl font-bold tracking-wide text-white/40 uppercase"
        >
          Clase {{ levelClass.classNumber }}
        </h2>
      </div>
    </div>

    <dl class="divide-y divide-white/10 font-mono text-xs tracking-[0.08em] uppercase">
      <div
        v-for="spec in specs"
        :key="spec.label"
        class="flex items-center justify-between gap-4 py-2.5"
      >
        <dt class="text-white/45">{{ spec.label }}</dt>
        <dd class="text-right text-white/40">
          {{ spec.value }}
        </dd>
      </div>
    </dl>

    <p class="mt-4 text-xs leading-relaxed text-white/55">
      {{ levelClass.description }}
    </p>

    <button
      type="button"
      class="mt-3 inline-flex items-center gap-2 rounded font-mono text-xs tracking-[0.14em] text-liminal-primary uppercase outline-none transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      @click="emit('viewClass', levelClass.id)"
    >
      <span>Ver clase completa</span>
      <span aria-hidden="true" class="text-sm">→</span>
    </button>

    <div class="mt-6 border-t border-white/10 pt-5">
      <h3 class="mb-2.5 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
        Documentado por
      </h3>
      <div class="flex items-center gap-3">
        <span
          class="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/10"
        >
          <img
            v-if="author.profileImage"
            :src="author.profileImage.thumbnailUrl"
            :alt="`Avatar de ${author.userName}`"
            class="h-full w-full object-cover grayscale contrast-125"
          />
        </span>
        <span class="font-mono text-xs tracking-[0.08em] text-neutral-200">
          {{ author.userName }}
        </span>
      </div>
    </div>
  </section>
</template>
