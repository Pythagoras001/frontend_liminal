<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { isAxiosError } from 'axios'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useCurrentUser } from '@/features/login/hooks/useCurrentUser'
import { useAuthStore } from '@/features/login/stores/useAuthStore'
import { useRateReport, useReportsByAuthor } from '@/features/report/hooks/useReport'
import { useEditProfile } from '@/features/profile/hooks/useEditProfile'
import type { EditProfileDraft } from '@/features/profile/model/EditProfileDraft'
import EditProfileModal from './components/editProfileModal/EditProfileModal.vue'
import ProfileHero from './components/ProfileHero.vue'
import ProfileReportsSection from './components/ProfileReportsSection.vue'
import ProfileReportsNav from './components/ProfileReportsNav.vue'

const router = useRouter()
const queryClient = useQueryClient()
const authStore = useAuthStore()

const { data: currentUser } = useCurrentUser()

/**
 * Página del archivo personal. Se pasa como `ref` para que la query la incluya
 * en su clave y vuelva a pedir los datos al cambiarla.
 */
const page = shallowRef(1)

const { data: archive, isPending, isError, refetch } = useReportsByAuthor(page)

/** Visibilidad del modal de edición de perfil. */
const isEditingProfile = shallowRef(false)

const {
  mutate: editProfile,
  reset: resetProfileMutation,
  isPending: isSavingProfile,
  error: profileError,
} = useEditProfile()

/** Traduce el fallo de la petición a un mensaje que el explorador entienda. */
const profileErrorMessage = computed(() => {
  if (!profileError.value) {
    return undefined
  }
  if (isAxiosError(profileError.value) && profileError.value.response?.status === 409) {
    return 'Ese alias o correo ya está en uso por otro explorador.'
  }
  return 'No se pudieron guardar los cambios. Inténtalo de nuevo.'
})

function saveProfile(draft: EditProfileDraft) {
  // El modal solo se cierra si el servidor confirma; si falla, sigue abierto
  // con el borrador intacto y el mensaje de error.
  editProfile(draft, {
    onSuccess: () => {
      isEditingProfile.value = false
    },
  })
}

/**
 * Al cerrar se descarta el error anterior para que la próxima apertura no
 * arranque mostrando el fallo del intento pasado. Mientras la petición está en
 * curso el modal no se cierra, para no perder de vista el resultado.
 */
function closeEditProfile() {
  if (isSavingProfile.value) {
    return
  }

  isEditingProfile.value = false
  resetProfileMutation()
}

function changePage(nextPage: number) {
  page.value = nextPage
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function selectReport(id: number) {
  router.push({ name: 'report-detail', params: { id } })
}

const { mutate: rateReport } = useRateReport()

/**
 * La tarjeta solo ofrece «me gusta»: repetirlo retira la valoración, porque el
 * servidor hace el toggle a partir del token.
 */
function likeReport(id: number) {
  rateReport({ reportId: id, liked: true })
}

function logout() {
  authStore.clearSession()
  queryClient.clear()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="mx-auto w-full max-w-7xl flex-1 px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <ProfileHero
        v-if="currentUser"
        :user="currentUser"
        @edit="isEditingProfile = true"
        @logout="logout"
      />

      <p
        v-if="isPending"
        aria-live="polite"
        class="border-b border-white/10 px-1 py-10 font-mono text-xs text-neutral-500 uppercase"
      >
        Recuperando tu archivo personal…
      </p>

      <div
        v-else-if="isError"
        role="alert"
        class="flex flex-col items-start gap-3 border-b border-white/10 px-1 py-10"
      >
        <p class="font-mono text-xs text-neutral-500 uppercase">
          No se pudo recuperar tu archivo personal.
        </p>
        <button
          type="button"
          class="border border-white/20 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-neutral-300 uppercase transition-colors hover:border-white/40 hover:text-white"
          @click="refetch()"
        >
          Reintentar
        </button>
      </div>

      <template v-else-if="archive">
        <ProfileReportsSection
          :reports="archive.data"
          :total="archive.total"
          @select="selectReport"
          @like="likeReport"
        />

        <ProfileReportsNav
          :page="archive.page"
          :page-size="archive.pageSize"
          :total="archive.total"
          :total-pages="archive.totalPages"
          :visible-count="archive.data.length"
          @update:page="changePage"
        />
      </template>
    </main>

    <EditProfileModal
      v-if="isEditingProfile && currentUser"
      :user="currentUser"
      :pending="isSavingProfile"
      :error-message="profileErrorMessage"
      @submit="saveProfile"
      @close="closeEditProfile"
    />

    <Footer />
  </div>
</template>
