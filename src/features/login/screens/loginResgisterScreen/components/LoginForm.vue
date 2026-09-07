<script setup lang="ts">
import { reactive } from 'vue'
import type { LoginCredentials } from '@/features/login/model/AuthCredentials'
import PasswordInput from './PasswordInput.vue'

const emit = defineEmits<{
  submit: [credentials: LoginCredentials]
  forgotPassword: []
}>()

const form = reactive<LoginCredentials>({
  email: '',
  password: '',
})

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="space-y-1.5">
      <label
        for="login-email"
        class="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase"
      >
        Correo electrónico
      </label>
      <input
        id="login-email"
        v-model="form.email"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="explorador@correo.com"
        required
        class="w-full border border-liminal-surface-raised bg-liminal-surface/90 px-3.5 py-2.5 text-sm text-neutral-300 placeholder-neutral-600 outline-none transition-colors focus:border-neutral-500"
      />
    </div>

    <PasswordInput
      id="login-password"
      v-model="form.password"
      label="Contraseña"
      autocomplete="current-password"
    />

    <div class="flex justify-end pt-0.5">
      <button
        type="button"
        class="rounded text-xs text-liminal-primary outline-none transition-colors hover:text-liminal-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        @click="emit('forgotPassword')"
      >
        ¿Olvidaste tu contraseña?
      </button>
    </div>

    <div class="pt-2">
      <button
        type="submit"
        class="flex w-full items-center justify-center space-x-2 bg-liminal-primary px-4 py-3 text-sm font-bold tracking-widest text-liminal-on-primary uppercase transition-all duration-150 hover:bg-liminal-primary-hover active:scale-[0.99]"
      >
        <span>Entrar</span>
        <svg
          class="ml-1 h-4 w-4 stroke-[2.5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </form>
</template>
