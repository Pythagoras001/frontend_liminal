<script setup lang="ts">
import type {
  AuthTab,
  LoginCredentials,
  RegisterCredentials,
} from '@/features/login/model/AuthCredentials'
import AuthTabs from './AuthTabs.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

interface Props {
  /** Estado de la petición de inicio de sesión, propagado a `LoginForm`. */
  loginPending?: boolean
  loginError?: string
  /** Aviso mostrado en la pestaña de acceso, ej. tras crear la cuenta. */
  loginNotice?: string
  /** Estado de la petición de registro, propagado a `RegisterForm`. */
  registerPending?: boolean
  registerError?: string
}

withDefaults(defineProps<Props>(), {
  loginPending: false,
  loginError: undefined,
  loginNotice: undefined,
  registerPending: false,
  registerError: undefined,
})

const emit = defineEmits<{
  login: [credentials: LoginCredentials]
  register: [credentials: RegisterCredentials]
  forgotPassword: []
}>()

/**
 * La pestaña activa es un `v-model` para que la pantalla pueda devolver al
 * explorador al acceso cuando termina el registro.
 */
const activeTab = defineModel<AuthTab>('tab', { default: 'login' })

function switchTo(tab: AuthTab) {
  activeTab.value = tab
}
</script>

<template>
  <section
    aria-label="Panel de autenticación"
    class="w-full max-w-113 border border-white/10 bg-liminal-surface/90 px-7 pt-10 pb-9 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-10"
  >
    <div class="mb-8 text-center">
      <h1
        class="text-2xl font-bold tracking-[0.38em] text-white uppercase select-none sm:text-[26px]"
      >
        Liminal
      </h1>
    </div>

    <AuthTabs v-model="activeTab" />

    <div
      id="auth-panel"
      role="tabpanel"
      :aria-labelledby="activeTab === 'login' ? 'tab-login' : 'tab-register'"
    >
      <LoginForm
        v-if="activeTab === 'login'"
        :pending="loginPending"
        :error-message="loginError"
        :notice="loginNotice"
        @submit="emit('login', $event)"
        @forgot-password="emit('forgotPassword')"
      />
      <RegisterForm
        v-else
        :pending="registerPending"
        :error-message="registerError"
        @submit="emit('register', $event)"
      />
    </div>

    <div class="mt-6 text-center text-xs text-neutral-400">
      <template v-if="activeTab === 'login'">
        ¿No tienes una cuenta?
        <button
          type="button"
          class="ml-1 rounded font-medium text-liminal-primary outline-none transition-colors hover:text-liminal-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
          @click="switchTo('register')"
        >
          Regístrate
        </button>
      </template>
      <template v-else>
        ¿Ya tienes una cuenta?
        <button
          type="button"
          class="ml-1 rounded font-medium text-liminal-primary outline-none transition-colors hover:text-liminal-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
          @click="switchTo('login')"
        >
          Inicia sesión
        </button>
      </template>
    </div>
  </section>
</template>
