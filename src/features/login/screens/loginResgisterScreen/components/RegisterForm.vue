<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { RegisterCredentials } from '@/features/login/model/AuthCredentials'
import PasswordInput from './PasswordInput.vue'

interface Props {
  /** Deshabilita el envío mientras la petición de registro está en curso. */
  pending?: boolean
  /** Mensaje de error del servidor; se muestra encima del botón. */
  errorMessage?: string
}

withDefaults(defineProps<Props>(), {
  pending: false,
  errorMessage: undefined,
})

const emit = defineEmits<{
  submit: [credentials: RegisterCredentials]
}>()

const form = reactive<RegisterCredentials>({
  explorerName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordsMatch = computed(
  () => form.confirmPassword.length === 0 || form.password === form.confirmPassword,
)

function handleSubmit() {
  if (!passwordsMatch.value) return
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="space-y-1.5">
      <label
        for="register-name"
        class="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase"
      >
        Nombre de explorador
      </label>
      <input
        id="register-name"
        v-model="form.explorerName"
        type="text"
        name="explorerName"
        autocomplete="username"
        placeholder="Explorador"
        required
        class="w-full border border-liminal-surface-raised bg-liminal-surface/90 px-3.5 py-2.5 text-sm text-neutral-300 placeholder-neutral-600 outline-none transition-colors focus:border-neutral-500"
      />
    </div>

    <div class="space-y-1.5">
      <label
        for="register-email"
        class="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase"
      >
        Correo electrónico
      </label>
      <input
        id="register-email"
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
      id="register-password"
      v-model="form.password"
      label="Contraseña"
      autocomplete="new-password"
    />

    <div class="space-y-1.5">
      <PasswordInput
        id="register-confirm-password"
        v-model="form.confirmPassword"
        label="Confirmar contraseña"
        autocomplete="new-password"
        :invalid="!passwordsMatch"
        :described-by="!passwordsMatch ? 'register-confirm-password-error' : undefined"
      />
      <p
        v-if="!passwordsMatch"
        id="register-confirm-password-error"
        role="alert"
        class="text-xs text-red-400"
      >
        Las contraseñas no coinciden.
      </p>
    </div>

    <p
      v-if="errorMessage"
      role="alert"
      class="border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
    >
      {{ errorMessage }}
    </p>

    <div class="pt-2">
      <button
        type="submit"
        :disabled="pending"
        class="flex w-full items-center justify-center space-x-2 bg-liminal-primary px-4 py-3 text-sm font-bold tracking-widest text-liminal-on-primary uppercase transition-all duration-150 hover:bg-liminal-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-liminal-primary"
      >
        <span>{{ pending ? 'Creando cuenta…' : 'Crear cuenta' }}</span>
        <svg
          v-if="!pending"
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
