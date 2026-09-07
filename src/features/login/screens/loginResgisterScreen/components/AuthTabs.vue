<script setup lang="ts">
import type { AuthTab } from '@/features/login/model/AuthCredentials'

const activeTab = defineModel<AuthTab>({ required: true })
</script>

<template>
  <div
    class="relative mb-7 flex w-full border-b border-liminal-surface-raised text-xs font-semibold tracking-widest"
    role="tablist"
    aria-label="Autenticación"
  >
    <button
      id="tab-login"
      type="button"
      role="tab"
      :aria-selected="activeTab === 'login'"
      aria-controls="auth-panel"
      class="flex-1 pb-3 text-center text-xs font-bold tracking-widest uppercase outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      :class="
        activeTab === 'login'
          ? 'border-b-2 border-liminal-primary text-liminal-primary'
          : 'text-neutral-400 hover:text-neutral-200'
      "
      @click="activeTab = 'login'"
    >
      Iniciar sesión
    </button>
    <button
      id="tab-register"
      type="button"
      role="tab"
      :aria-selected="activeTab === 'register'"
      aria-controls="auth-panel"
      class="flex-1 pb-3 text-center text-xs font-bold tracking-widest uppercase outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
      :class="
        activeTab === 'register'
          ? 'border-b-2 border-liminal-primary text-liminal-primary'
          : 'text-neutral-400 hover:text-neutral-200'
      "
      @click="activeTab = 'register'"
    >
      Registrarse
    </button>
  </div>
</template>
