<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import NavItem from './NavItem.vue'
import { useCurrentUser } from '@/features/login/hooks/useCurrentUser'
import { useAuthStore } from '@/features/login/stores/useAuthStore'

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

const { isAuthenticated } = storeToRefs(useAuthStore())

// La petición del perfil se dispara sola en cuanto hay sesión; aquí solo se
// consume el resultado.
const { data: currentUser } = useCurrentUser()

/**
 * Se decide por el token, no por el perfil ya cargado: así al recargar la
 * página no parpadea el botón "Ingresar" mientras `/user/me` está en vuelo. Si
 * el token resulta inválido, el interceptor lo borra ante el 401 y esto vuelve
 * a `false` por su cuenta.
 */
const hasSession = computed(
  () => isAuthenticated.value || !!props.explorerName || !!props.avatarUrl,
)

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
      <RouterLink
        v-if="hasSession"
        :to="{ name: 'profile' }"
        class="flex items-center gap-3 rounded outline-none transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        :aria-label="`Ver el perfil de ${displayName}`"
      >
        <div
          class="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-neutral-800 md:h-9 md:w-9"
        >
          <img
            v-if="displayAvatar"
            :src="displayAvatar"
            alt=""
            class="h-full w-full object-cover grayscale contrast-125"
          />

          <!-- Silueta por defecto mientras el explorador no tenga fotografía. -->
          <svg
            v-else
            aria-hidden="true"
            class="h-4 w-4 text-white/55 md:h-[18px] md:w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="hidden text-xs font-medium tracking-wide text-white/90 md:inline md:text-sm">
          {{ displayName }}
        </span>
      </RouterLink>

      <RouterLink
        v-else
        :to="{ name: 'login-register' }"
        class="rounded border border-liminal-primary px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-liminal-primary uppercase outline-none transition-colors hover:bg-liminal-primary hover:text-liminal-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary md:text-xs"
      >
        Ingresar
      </RouterLink>

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
