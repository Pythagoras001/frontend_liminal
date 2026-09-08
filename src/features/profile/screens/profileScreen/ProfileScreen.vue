<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useCurrentUser } from '@/features/login/hooks/useCurrentUser'
import { useAuthStore } from '@/features/login/stores/useAuthStore'
import { useReportsByAuthor } from '@/features/report/hooks/useReport'
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

function changePage(nextPage: number) {
  page.value = nextPage
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
      <ProfileHero v-if="currentUser" :user="currentUser" @logout="logout" />

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

    <Footer />
  </div>
</template>
