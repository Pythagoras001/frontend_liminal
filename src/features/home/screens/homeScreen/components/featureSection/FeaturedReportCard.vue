<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/features/report/model/Report'

interface Props {
  report: Report
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: number]
}>()

const titulo = computed(() => `Nivel ${props.report.nivel} · ${props.report.levelClass.type}`)

const clasificacion = computed(() =>
  [
    props.report.levelClass.classNumber,
    props.report.levelClass.securityLevel,
    props.report.levelClass.dangerLevel,
  ].join('  •  '),
)
</script>

<template>
  <button
    type="button"
    class="group flex flex-col overflow-hidden border border-white/10 bg-liminal-surface text-left outline-none transition-colors duration-300 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
    @click="emit('select', report.id)"
  >
    <span class="relative block aspect-[4/5] w-full overflow-hidden bg-neutral-900">
      <img
        :src="report.principalEvidence.image.mediumUrl"
        :alt="`Fotografía documental del ${titulo}`"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span
        class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />
    </span>

    <span class="flex flex-col gap-2 px-4 py-3 md:px-5">
      <span class="text-sm font-bold tracking-wide text-white uppercase md:text-base">
        NIVEL {{ report.nivel }} • Clase {{ report.levelClass.classNumber }}
      </span>
      <span class="h-px w-full bg-white/10" />
      <span
        class="font-mono text-[11px] leading-relaxed tracking-[0.15em] text-neutral-300 uppercase md:text-xs"
      >
        {{ clasificacion }}
      </span>
    </span>
  </button>
</template>
