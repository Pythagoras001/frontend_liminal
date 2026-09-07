<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import type { NewReportDraft } from '@/features/report/model/NewReportDraft'
import CreateReportHeader from './components/CreateReportHeader.vue'
import CreateReportForm from './components/CreateReportForm.vue'

const router = useRouter()

function publishReport(draft: NewReportDraft) {
  // TODO: subir las imágenes y crear el reporte cuando exista el endpoint;
  // el borrador ya llega con los ficheros listos para un `multipart/form-data`.
  console.info('Publicar reporte', draft)
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
        <CreateReportForm @submit="publishReport" @cancel="cancel" />
      </div>
    </main>

    <Footer />
  </div>
</template>
