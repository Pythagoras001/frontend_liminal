<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useCreateReport } from '@/features/report/hooks/useCreateReport'
import type { NewReportDraft } from '@/features/report/model/NewReportDraft'
import CreateReportHeader from './components/CreateReportHeader.vue'
import CreateReportForm from './components/CreateReportForm.vue'

const router = useRouter()

const { mutate: createReport, isPending, error } = useCreateReport()

/** Traduce el fallo de la petición a un mensaje que el explorador entienda. */
const errorMessage = computed(() => {
  if (!error.value) {
    return undefined
  }
  if (isAxiosError(error.value) && error.value.response?.status === 401) {
    return 'Tu sesión expiró. Vuelve a iniciar sesión para publicar el reporte.'
  }
  return 'No se pudo publicar el reporte. Inténtalo de nuevo.'
})

function publishReport(draft: NewReportDraft) {
  createReport(draft, {
    onSuccess: (report) => {
      router.push({ name: 'report-detail', params: { id: report.id } })
    },
  })
}

function cancel() {
  router.push({ name: 'reports' })
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="flex-1 pt-10 pb-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <CreateReportHeader />
        <CreateReportForm
          :pending="isPending"
          :error-message="errorMessage"
          @submit="publishReport"
          @cancel="cancel"
        />
      </div>
    </main>

    <Footer />
  </div>
</template>
