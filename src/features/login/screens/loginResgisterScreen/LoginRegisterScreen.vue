<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import AuthCard from './components/AuthCard.vue'
import { useLogin } from '@/features/login/hooks/useLogin'
import type { LoginCredentials, RegisterCredentials } from '@/features/login/model/AuthCredentials'

const backgroundUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDcw4zihPRSt9KuR0KzOfb-EmEBiRbAllWclh3Ta6ba2fH679pDdP08xvO33Wkfbb6bfwlvfhmjNq36HWf6AXb7xG_GcluLQzMAo56wMC0Cc-5YdeJoal9hvYRs1sl2phBf07uonkZwOE-GtiqSJkjao82D2ZR-avkOeZH7zYMwheiDzdTBNZydkGoDdmnkBSHdE40VESW4LeyZC7ImRQvNWedF4Z6-d8Hk06If561YjbkOjtiBbiWa'

const router = useRouter()

const { mutate: login, isPending, error } = useLogin()

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
  login(credentials, {
    onSuccess: () => router.push({ name: 'home' }),
  })
}

function handleRegister(credentials: RegisterCredentials) {
  // TODO: conectar con el servicio de registro cuando exista.
  console.info('Registrarse', credentials)
}

function handleForgotPassword() {
  // TODO: navegar al flujo de recuperación de contraseña cuando exista la ruta correspondiente.
  console.info('Recuperar contraseña')
}
</script>

<template>
  <div
    class="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-liminal-bg"
  >
    <div class="fixed inset-0 z-0 overflow-hidden">
      <img :src="backgroundUrl" alt="" class="h-full w-full object-cover object-center" />
      <div
        class="absolute inset-0 bg-gradient-to-b from-liminal-bg/80 via-liminal-bg/40 to-liminal-bg/90"
      />
      <div class="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.85)]" />
    </div>

    <NavBar class="relative z-20" />

    <main class="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
      <AuthCard
        :login-pending="isPending"
        :login-error="loginError"
        @login="handleLogin"
        @register="handleRegister"
        @forgot-password="handleForgotPassword"
      />
    </main>

    <Footer class="relative z-10" />
  </div>
</template>
