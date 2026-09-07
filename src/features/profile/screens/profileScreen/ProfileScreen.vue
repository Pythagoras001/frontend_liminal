<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useCurrentUser } from '@/features/login/hooks/useCurrentUser'
import { useAuthStore } from '@/features/login/stores/useAuthStore'
import { profileReportsPage, profileUser } from './data/profileReports.mock'
import ProfileHero from './components/ProfileHero.vue'
import ProfileReportsSection from './components/ProfileReportsSection.vue'
import ProfileReportsNav from './components/ProfileReportsNav.vue'

const router = useRouter()
const queryClient = useQueryClient()
const authStore = useAuthStore()

const { data: currentUser } = useCurrentUser()

// TODO: pedir el archivo del explorador cuando exista el endpoint de reportes
// por autor; por ahora se muestra el mock.
const archive = shallowRef(profileReportsPage)

/** El perfil del mock permite ver la pantalla mientras no haya sesión real. */
const user = computed(() => currentUser.value ?? profileUser)

function changePage(nextPage: number) {
  // TODO: pedir la página al servidor; el mock solo contiene la primera.
  console.info('Cambiar a la página', nextPage)
}

function selectReport(id: number) {
  router.push({ name: 'report-detail', params: { id } })
}

function likeReport(id: number) {
  // TODO: enviar la valoración al servidor cuando exista el endpoint.
  console.info('Valorar reporte', id)
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
      <ProfileHero :user="user" @logout="logout" />

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
    </main>

    <Footer />
  </div>
</template>
