<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import Footer from '@/features/shared/components/ui/footer/FooterLiminal.vue'
import LevelShowcase from './components/headerSection/LevelShowcase.vue'
import FeaturedReportsSection from './components/featureSection/FeaturedReportsSection.vue'
import CommunityRegisterSection from './components/comunityRegisterSection/CommunityRegisterSection.vue'
import { useReport } from '@/features/report/hooks/useReport'
import { niveles } from './data/niveles.mock'

/** Reportes que ocupan la sección de archivos destacados. */
const FEATURED_COUNT = 3

/** Reportes que caben en la rejilla de registros de la comunidad. */
const COMMUNITY_COUNT = 5

const router = useRouter()

const { data: archive, isPending, isError, refetch } = useReport()

const reports = computed(() => archive.value?.data ?? [])

/**
 * La primera sección muestra los tres primeros reportes y la segunda los cinco
 * siguientes; el resto solo aparece en el archivo completo (`/reports`).
 */
const featuredReports = computed(() => reports.value.slice(0, FEATURED_COUNT))
const communityReports = computed(() =>
  reports.value.slice(FEATURED_COUNT, FEATURED_COUNT + COMMUNITY_COUNT),
)

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
  router.push({ name: 'report-detail', params: { id } })
}

function exploreLevel() {
  router.push({ name: 'reports' })
}

function publishFinding() {
  router.push({ name: 'report-create' })
}

function viewAllRegisters() {
  router.push({ name: 'reports' })
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
          @explore="exploreLevel"
        />
      </main>
    </section>

    <p
      v-if="isPending"
      aria-live="polite"
      class="px-5 py-14 font-mono text-xs text-neutral-500 uppercase md:px-12 md:py-20"
    >
      Recuperando el archivo de reportes…
    </p>

    <div
      v-else-if="isError"
      role="alert"
      class="flex flex-col items-start gap-3 px-5 py-14 md:px-12 md:py-20"
    >
      <p class="font-mono text-xs text-neutral-500 uppercase">
        No se pudo recuperar el archivo de reportes.
      </p>
      <button
        type="button"
        class="border border-white/20 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-neutral-300 uppercase transition-colors hover:border-white/40 hover:text-white"
        @click="refetch()"
      >
        Reintentar
      </button>
    </div>

    <template v-else>
      <FeaturedReportsSection :reports="featuredReports" @select="selectReport" />

      <CommunityRegisterSection
        :reports="communityReports"
        @select="selectReport"
        @publish="publishFinding"
        @view-all="viewAllRegisters"
      />
    </template>

    <Footer />
  </div>
</template>
