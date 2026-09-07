<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import LevelShowcase from './components/headerSection/LevelShowcase.vue'
import FeaturedReportsSection from './components/featureSection/FeaturedReportsSection.vue'
import CommunityRegisterSection from './components/comunityRegisterSection/CommunityRegisterSection.vue'
import { niveles } from './data/niveles.mock'
import { featuredReports } from './data/reports.mock'
import { communityReports } from './data/communityReports.mock'

const firstLevel = niveles[0]
if (!firstLevel) {
  throw new Error('El mock de niveles no puede estar vacío.')
}

const activeLevelId = shallowRef(niveles.find((nivel) => nivel.activo)?.id ?? firstLevel.id)

const activeIndex = computed(() => niveles.findIndex((nivel) => nivel.id === activeLevelId.value))

const activeLevel = computed(() => niveles[activeIndex.value] ?? firstLevel)

const heroStyle = computed(() => ({
  backgroundImage: [
    'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6))',
    'linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7))',
    `url(${activeLevel.value.imgFondo})`,
  ].join(', '),
}))

function selectLevel(id: string) {
  activeLevelId.value = id
}

function goToOffset(offset: number) {
  const nextIndex = (activeIndex.value + offset + niveles.length) % niveles.length
  // nextIndex is always within [0, niveles.length) thanks to the modulo above.
  activeLevelId.value = niveles[nextIndex]!.id
}

function goPrev() {
  goToOffset(-1)
}

function goNext() {
  goToOffset(1)
}

function selectReport(id: number) {
  // TODO: navegar al detalle del reporte cuando exista la ruta correspondiente.
  console.info('Reporte seleccionado', id)
}

function exploreMoreLevels() {
  // TODO: navegar al listado completo de niveles cuando exista la ruta correspondiente.
  console.info('Explorar más niveles')
}

function publishFinding() {
  // TODO: navegar al formulario de publicación cuando exista la ruta correspondiente.
  console.info('Publicar un hallazgo')
}

function viewAllRegisters() {
  // TODO: navegar al listado completo de registros cuando exista la ruta correspondiente.
  console.info('Ver todos los registros')
}

function openTerms() {
  // TODO: navegar a los términos de expedición cuando exista la ruta correspondiente.
  console.info('Términos de expedición')
}

function openSecurityProtocol() {
  // TODO: navegar al protocolo de seguridad cuando exista la ruta correspondiente.
  console.info('Protocolo de seguridad')
}

function openTerminal() {
  // TODO: navegar al terminal cuando exista la ruta correspondiente.
  console.info('Terminal')
}
</script>

<template>
  <div class="w-full bg-liminal-bg">
    <section
      class="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-liminal-bg bg-cover bg-center bg-no-repeat"
      :style="heroStyle"
    >
      <NavBar class="relative z-20" />

      <main class="relative z-10 flex flex-1 flex-col justify-end px-5 pb-5 md:px-12 md:pb-10">
        <LevelShowcase
          :niveles="niveles"
          :active-level="activeLevel"
          @select="selectLevel"
          @prev="goPrev"
          @next="goNext"
        />
      </main>
    </section>

    <FeaturedReportsSection
      :reports="featuredReports"
      @select="selectReport"
      @explore-more="exploreMoreLevels"
    />

    <CommunityRegisterSection
      :reports="communityReports"
      @select="selectReport"
      @publish="publishFinding"
      @view-all="viewAllRegisters"
    />

    <Footer
      @terms-click="openTerms"
      @security-click="openSecurityProtocol"
      @terminal-click="openTerminal"
    />
  </div>
</template>
