<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/features/report/model/Report'
import { getAuthorInitials } from './authorInitials'
import { formatArchiveDate } from '@/features/shared/utils/formatArchiveDate'

interface Props {
  report: Report
  /**
   * Qué se muestra en el pie de la tarjeta junto a las valoraciones. En un
   * archivo colectivo interesa quién lo documentó; en el archivo personal de un
   * explorador el autor es siempre el mismo, así que se muestra la fecha.
   */
  footer?: 'author' | 'date'
}

const props = withDefaults(defineProps<Props>(), {
  footer: 'author',
})

const emit = defineEmits<{
  select: [id: number]
  like: [id: number]
}>()

const initials = computed(() => getAuthorInitials(props.report.author))

const publishedAt = computed(() => formatArchiveDate(props.report.createdAt))

const imageAlt = computed(() => `${props.report.description} — Nivel ${props.report.nivel}`)
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded border border-white/10 bg-liminal-surface transition-colors duration-300 hover:border-white/25"
  >
    <button
      type="button"
      class="flex flex-1 flex-col text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-liminal-primary"
      @click="emit('select', report.id)"
    >
      <span class="relative block aspect-16/10 w-full overflow-hidden bg-black">
        <img
          :src="report.principalEvidence.image.mediumUrl"
          :alt="imageAlt"
          loading="lazy"
          class="h-full w-full object-cover brightness-95 transition-transform duration-500 group-hover:scale-[1.03] group-hover:brightness-105"
        />
        <span
          aria-hidden="true"
          class="absolute inset-0 bg-linear-to-t from-liminal-surface via-transparent to-transparent opacity-60"
        ></span>
      </span>

      <span class="flex flex-1 flex-col gap-1.5 px-4 pt-4 pb-3 sm:px-5">
        <span
          class="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-white/45 uppercase"
        >
          <span>{{ report.nivel }}</span>
          <span aria-hidden="true" class="text-white/20">|</span>
          <span class="font-medium text-liminal-primary"
            >Clase {{ report.levelClass.classNumber }}</span
          >
        </span>

        <h3
          class="line-clamp-1 text-lg font-bold tracking-tight text-white uppercase transition-colors group-hover:text-liminal-primary sm:text-xl"
        >
          {{ report.title }}
        </h3>
      </span>
    </button>

    <div class="mx-4 flex items-center justify-between border-t border-white/10 py-3 sm:mx-5">
      <time
        v-if="footer === 'date'"
        :datetime="report.createdAt"
        class="font-mono text-xs text-white/55"
      >
        {{ publishedAt }}
      </time>

      <div v-else class="flex items-center gap-2">
        <span
          class="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5"
        >
          <img
            v-if="report.author.profileImage"
            :src="report.author.profileImage.thumbnailUrl"
            :alt="`Avatar de ${report.author.userName}`"
            class="h-full w-full object-cover grayscale contrast-125"
          />
          <span v-else aria-hidden="true" class="font-mono text-[9px] text-white/60">
            {{ initials }}
          </span>
        </span>
        <span class="font-mono text-xs text-white/55">{{ report.author.userName }}</span>
      </div>

      <button
        type="button"
        class="flex items-center gap-1.5 rounded font-mono text-xs text-white/50 outline-none transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        :aria-label="`Marcar como útil el reporte ${report.description}`"
        @click="emit('like', report.id)"
      >
        <svg
          aria-hidden="true"
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ report.likesCount }}</span>
      </button>
    </div>
  </article>
</template>
