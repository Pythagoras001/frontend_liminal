<script setup lang="ts">
import { computed, onMounted, useId, useTemplateRef } from 'vue'
import { getClassNumberLabel, type LevelClass } from '@/features/levelClass/model/LevelClass'
import { DEFAULT_ACCENT } from './survivalClassAccent'

interface Props {
  levelClass: LevelClass
  /**
   * Mueve el foco al encabezado al montarse. La fila que el usuario pulsó deja
   * de existir al expandirse, así que sin esto el foco se perdería.
   */
  autofocusHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autofocusHeader: false,
})

const emit = defineEmits<{
  viewLevels: [id: number]
}>()

const headerId = useId()
const panelId = useId()

const headerButton = useTemplateRef<HTMLButtonElement>('headerButton')

onMounted(() => {
  if (props.autofocusHeader) {
    headerButton.value?.focus()
  }
})

const accent = DEFAULT_ACCENT.accent

const classNumberLabel = computed(() => getClassNumberLabel(props.levelClass.classNumber))

/** Las tres etiquetas de estado que el diseño muestra bajo el título. */
const statusTags = computed(() => [
  props.levelClass.securityLevel,
  props.levelClass.legitimacy,
  props.levelClass.dangerLevel,
])
</script>

<template>
  <article class="relative flex flex-col overflow-hidden bg-liminal-surface shadow-2xl md:flex-row">
    <div class="flex flex-1 flex-col justify-between p-6 md:p-7">
      <div>
        <div class="mb-4 flex items-center gap-4">
          <!-- Decorativo: el número ya aparece en el título de la clase. -->
          <img
            :src="levelClass.iconImage.thumbnailUrl"
            alt=""
            aria-hidden="true"
            width="48"
            height="48"
            class="h-12 w-12 flex-shrink-0 object-contain object-center"
          />
          <div>
            <span class="block font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
              Dificultad de supervivencia
            </span>
            <h3 class="text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              <button
                :id="headerId"
                ref="headerButton"
                type="button"
                class="rounded text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-liminal-primary"
                :aria-expanded="true"
                :aria-controls="panelId"
                aria-disabled="true"
              >
                {{ classNumberLabel }}
              </button>
            </h3>
          </div>
        </div>

        <div :id="panelId" role="region" :aria-labelledby="headerId">
          <ul
            class="flex flex-wrap items-center gap-x-3 gap-y-2 py-2 font-mono text-[11px]"
            :class="accent"
          >
            <li
              v-for="(tag, index) in statusTags"
              :key="tag"
              class="inline-flex items-center gap-1.5"
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
                  v-if="index === 0"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <template v-else-if="index === 1">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
                </template>
                <template v-else>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </template>
              </svg>
              <span class="tracking-wide uppercase">{{ tag }}</span>
            </li>
          </ul>

          <p class="mt-2.5 max-w-sm text-xs leading-relaxed text-neutral-400">
            {{ levelClass.description }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="relative h-52 overflow-hidden border-t border-white/10 bg-black md:h-auto md:w-5/12 md:border-t-0 md:border-l"
    >
      <img
        :src="levelClass.iconImage.mediumUrl"
        :alt="`Nivel representativo de la ${classNumberLabel.toLowerCase()}`"
        loading="lazy"
        class="h-full w-full object-cover object-center brightness-90 contrast-125 grayscale-[20%] transition-transform duration-700 hover:scale-105"
      />
      <span
        aria-hidden="true"
        class="absolute inset-0 hidden bg-gradient-to-r from-liminal-surface via-transparent to-black/30 md:block"
      />
      <span
        aria-hidden="true"
        class="absolute inset-0 bg-gradient-to-t from-liminal-surface via-transparent to-transparent md:hidden"
      />
    </div>
  </article>
</template>
