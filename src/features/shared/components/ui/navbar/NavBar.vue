<script setup lang="ts">
import { computed } from 'vue'
import NavItem from './NavItem.vue'
import { useCurrentUser } from '@/features/login/hooks/useCurrentUser'

interface Props {
  filterLabel?: string
  sector?: string
  terminal?: string
  /** Sobrescribe el nombre de la sesión; útil para maquetar sin backend. */
  explorerName?: string
  /** Sobrescribe el avatar de la sesión; útil para maquetar sin backend. */
  avatarUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  filterLabel: 'Todos los niveles',
  sector: 'Sector Alpha',
  terminal: 'Terminal 09',
  explorerName: undefined,
  avatarUrl: undefined,
})

// La petición del perfil se dispara sola en cuanto hay sesión; aquí solo se
// consume el resultado.
const { data: currentUser } = useCurrentUser()

const displayName = computed(
  () => props.explorerName ?? currentUser.value?.userName ?? 'Explorador',
)

const displayAvatar = computed(
  () => props.avatarUrl ?? currentUser.value?.profileImage?.thumbnailUrl,
)

const emit = defineEmits<{
  filterClick: []
  searchClick: []
  menuClick: []
}>()
</script>

<template>
  <header class="relative flex w-full items-center justify-between gap-4 px-5 pt-8 pb-4 md:px-12">
    <div class="flex items-center gap-6">
      <span class="text-xl font-bold tracking-[0.28em] text-white uppercase md:text-2xl"
        >LIMINAL</span
      >
    </div>

    <nav
      class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
      aria-label="Navegación principal"
    >
      <NavItem label="Home" :to="{ name: 'home' }" />
      <NavItem label="Categorías" :to="{ name: 'class' }" />
      <NavItem label="Registros" :to="{ name: 'reports' }" />
    </nav>

    <div class="flex items-center gap-5 md:gap-6">
      <div class="flex items-center gap-3">
        <div
          class="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-white/30 bg-neutral-800 md:h-9 md:w-9"
        >
          <img
            v-if="displayAvatar"
            :src="displayAvatar"
            alt=""
            class="h-full w-full object-cover grayscale contrast-125"
          />
        </div>
        <span class="hidden text-xs font-medium tracking-wide text-white/90 md:inline md:text-sm">
          {{ displayName }}
        </span>
      </div>

      <button
        type="button"
        class="rounded p-1.5 text-white/80 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        aria-label="Buscar archivo"
        @click="emit('searchClick')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        class="rounded p-1.5 text-white/80 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        aria-label="Menú principal"
        @click="emit('menuClick')"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </header>
</template>
