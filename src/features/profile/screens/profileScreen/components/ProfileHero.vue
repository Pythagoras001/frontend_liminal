<script setup lang="ts">
import type { AuthUser } from '@/features/login/model/AuthUser'

interface Props {
  user: AuthUser
}

defineProps<Props>()

const emit = defineEmits<{
  logout: []
}>()
</script>

<template>
  <section
    aria-labelledby="perfil-nombre"
    class="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center"
  >
    <div class="flex items-center gap-6 md:gap-8">
      <div class="relative">
        <div
          class="h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-neutral-900 p-1 shadow-[0_0_25px_rgba(0,0,0,0.8)] sm:h-32 sm:w-32"
        >
          <img
            v-if="user.profileImage"
            :src="user.profileImage.mediumUrl"
            alt=""
            class="h-full w-full rounded-full object-cover object-center brightness-95 contrast-110"
          />

          <!-- Silueta por defecto mientras el explorador no tenga fotografía. -->
          <svg
            v-else
            aria-hidden="true"
            class="h-full w-full text-white/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.2"
          >
            <path
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 rounded-full border border-liminal-primary/20"
        ></span>
      </div>

      <div class="space-y-1">
        <h1
          id="perfil-nombre"
          class="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl md:text-6xl md:leading-none"
        >
          {{ user.userName }}
        </h1>
        <p class="font-mono text-xs tracking-wide text-white/45 sm:text-sm">
          {{ user.email }}
        </p>
      </div>
    </div>

    <button
      type="button"
      class="self-end rounded-sm border border-white/15 px-6 py-2.5 font-mono text-xs tracking-[0.18em] text-neutral-200 uppercase outline-none transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary active:scale-95 sm:text-sm md:self-center"
      @click="emit('logout')"
    >
      Cerrar sesión
    </button>
  </section>
</template>
