<script setup lang="ts">
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import { useSurvivalClassTypeFilter } from '@/features/levelClass/hooks/useSurvivalClassTypeFilter'
import { levelClasses } from './data/levelClasses.mock'
import ClassPageHeader from './components/ClassPageHeader.vue'
import StandardClassSection from './components/StandardClassSection.vue'
import ClassTypeSection from './components/ClassTypeSection.vue'

/** Enlaza el filtro de tipos con el listado mediante `aria-controls`. */
const CLASS_LIST_ID = 'clases-listado'

const { typeOptions, activeType, visibleClasses, selectType } =
  useSurvivalClassTypeFilter(levelClasses)

function selectClass(id: number) {
  // TODO: navegar al detalle de la clase cuando exista la ruta correspondiente.
  console.info('Clase seleccionada', id)
}

function viewLevels(id: number) {
  // TODO: navegar al listado de niveles de la clase cuando exista la ruta correspondiente.
  console.info('Ver niveles de la clase', id)
}

function openClassificationSystem() {
  // TODO: navegar a la explicación del sistema de clasificación cuando exista la ruta.
  console.info('Conocer el sistema de clasificación')
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-liminal-bg">
    <NavBar class="border-b border-white/10" />

    <main class="mx-auto w-full max-w-[1520px] flex-1 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <ClassPageHeader />

      <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <StandardClassSection
          :classes="visibleClasses"
          :class-type="activeType"
          :list-id="CLASS_LIST_ID"
          @select="selectClass"
          @view-levels="viewLevels"
        />

        <ClassTypeSection
          :types="typeOptions"
          :active-type="activeType"
          :controls-id="CLASS_LIST_ID"
          @select="selectType"
          @learn-more="openClassificationSystem"
        />
      </div>
    </main>

    <Footer />
  </div>
</template>
