<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/features/report/model/Report'
import { formatRelativeTime } from '@/features/shared/utils/formatRelativeTime'

interface Props {
  report: Report
  /** Tarjeta grande con foto ampliada y cita descriptiva; el resto son compactas. */
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
})

const emit = defineEmits<{
  select: [id: number]
}>()

const relativeTime = computed(() => formatRelativeTime(props.report.createdAt))

const badgeClasses = computed(() => {
  switch (props.report.levelClass.legitimacy) {
    case 'Verificado':
      return 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
    case 'En revisión':
      return 'border-liminal-primary/40 bg-liminal-primary/10 text-liminal-primary'
    default:
      return 'border-white/20 bg-white/5 text-white/60'
  }
})
</script>

<template>
  <button
    type="button"
    class="group flex flex-col overflow-hidden border border-white/10 bg-liminal-surface text-left outline-none transition-colors duration-300 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
    @click="emit('select', report.id)"
  >
    <span
      class="relative block w-full overflow-hidden bg-neutral-900"
      :class="featured ? 'aspect-[3/4]' : 'aspect-[16/9]'"
    >
      <img
        :src="report.principalEvidence.image.mediumUrl"
        :alt="`Fotografía del registro: ${report.description}`"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </span>

    <span class="flex flex-1 flex-col gap-3 px-4 py-4 md:px-5">
      <span class="flex items-center justify-between gap-3">
        <span class="flex items-center gap-2.5">
          <span class="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-white/20 bg-neutral-800">
            <img
              v-if="report.author.profileImage"
              :src="report.author.profileImage.thumbnailUrl"
              :alt="`Avatar de ${report.author.userName}`"
              class="h-full w-full object-cover grayscale contrast-125"
            />
          </span>
          <span class="flex flex-col leading-tight">
            <span class="text-sm font-semibold text-white">{{ report.author.userName }}</span>
            <span class="font-mono text-xs text-white/50">{{ relativeTime }}</span>
          </span>
        </span>

        <span
          class="flex-shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase"
          :class="badgeClasses"
        >
          {{ report.levelClass.legitimacy }}
        </span>
      </span>

      <span class="flex flex-1 flex-col gap-1.5">
        <span
          class="font-bold text-white"
          :class="featured ? 'text-xl md:text-2xl' : 'text-sm md:text-base'"
        >
          {{ report.description }}
        </span>
        <span v-if="featured" class="text-sm text-white/60 md:text-base">
          {{ report.levelClass.description }}
        </span>
      </span>

      <span class="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <span class="flex items-center gap-1.5 font-mono text-xs text-white/60">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72A7.947 7.947 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ report.likesCount }}
        </span>
        <span v-if="featured" class="font-mono text-xs tracking-wider text-white/40 uppercase">
          EXP. #{{ report.id }}
        </span>
      </span>
    </span>
  </button>
</template>
