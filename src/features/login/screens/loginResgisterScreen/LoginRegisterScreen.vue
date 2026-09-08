<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import AuthCard from './components/AuthCard.vue'
import { useLogin } from '@/features/login/hooks/useLogin'
import { useRegister } from '@/features/login/hooks/useRegister'
import type {
  AuthTab,
  LoginCredentials,
  RegisterCredentials,
} from '@/features/login/model/AuthCredentials'

const backgroundUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDcw4zihPRSt9KuR0KzOfb-EmEBiRbAllWclh3Ta6ba2fH679pDdP08xvO33Wkfbb6bfwlvfhmjNq36HWf6AXb7xG_GcluLQzMAo56wMC0Cc-5YdeJoal9hvYRs1sl2phBf07uonkZwOE-GtiqSJkjao82D2ZR-avkOeZH7zYMwheiDzdTBNZydkGoDdmnkBSHdE40VESW4LeyZC7ImRQvNWedF4Z6-d8Hk06If561YjbkOjtiBbiWa'

const router = useRouter()

const activeTab = ref<AuthTab>('login')
/** Aviso mostrado en la pestaña de acceso tras crear la cuenta. */
const loginNotice = ref<string>()

const { mutate: login, isPending, error } = useLogin()
const { mutate: register, isPending: isRegisterPending, error: registerError } = useRegister()

/** Traduce el fallo de la petición a un mensaje que el explorador entienda. */
const loginError = computed(() => {
  if (!error.value) {
    return undefined
  }
  if (isAxiosError(error.value) && error.value.response?.status === 401) {
    return 'Credenciales incorrectas. Revisa el correo y la contraseña.'
  }
  return 'No se pudo conectar con el archivo. Inténtalo de nuevo.'
})

function handleLogin(credentials: LoginCredentials) {
  // Al intentar entrar, el aviso de "cuenta creada" ya cumplió su función: se
  // retira para que un fallo de acceso no aparezca junto a un mensaje de éxito.
  loginNotice.value = undefined

  login(credentials, {
    onSuccess: () => router.push({ name: 'home' }),
  })
}

/** El registro no abre sesión: se devuelve al explorador a la pestaña de acceso. */
const registerErrorMessage = computed(() => {
  if (!registerError.value) {
    return undefined
  }
  if (isAxiosError(registerError.value)) {
    const status = registerError.value.response?.status
    if (status === 409) {
      return 'Ese correo o nombre de explorador ya está registrado.'
    }
    if (status === 400 || status === 422) {
      return 'Revisa los datos: el servidor los ha rechazado.'
    }
  }
  return 'No se pudo crear la cuenta. Inténtalo de nuevo.'
})

function handleRegister(credentials: RegisterCredentials) {
  register(credentials, {
    onSuccess: () => {
      activeTab.value = 'login'
      loginNotice.value = 'Cuenta creada. Inicia sesión para entrar al archivo.'
    },
  })
}

</script>

<template>
  <div
    class="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-liminal-bg"
  >
    <div class="fixed inset-0 z-0 overflow-hidden">
      <img :src="backgroundUrl" alt="" class="h-full w-full object-cover object-center" />
      <div
        class="absolute inset-0 bg-linear-to-b from-liminal-bg/80 via-liminal-bg/40 to-liminal-bg/90"
      />
      <div class="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.85)]" />
    </div>

    <NavBar class="relative z-20" />

    <main class="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
      <AuthCard
        v-model:tab="activeTab"
        :login-pending="isPending"
        :login-error="loginError"
        :login-notice="loginNotice"
        :register-pending="isRegisterPending"
        :register-error="registerErrorMessage"
        @login="handleLogin"
        @register="handleRegister"
      />
    </main>

    <Footer class="relative z-10" />
  </div>
</template>
