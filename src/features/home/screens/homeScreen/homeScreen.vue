<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import NavBar from '@/features/shared/components/ui/navbar/NavBar.vue'
import LevelShowcase from './components/headerSection/LevelShowcase.vue'
import { niveles } from './data/niveles.mock'

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
</script>

<template>
  <section
    class="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-liminal-bg bg-cover bg-center bg-no-repeat"
    :style="heroStyle"
  >
    <NavBar
      class="relative z-20"
      avatar-url="https://lh3.googleusercontent.com/aida/AEtjO1VVzPpXRNlzf5_kX_3AWQniosuAeX2fXZgx-UJsvSr0UKWMaWrWkU2edQwnX4_KMBh3dmFmwwDuySnz0TFUeuYBLzeNjkHjVSDMmfQ3T3xkPihqJxJVWLsb-MYnD0Dkg7npmvQx9iTVK01t_Hru4csrCPLzNo10xPU-acGS6cRTU3eEXIFYxKXvbkdYZb5H8M0hU1VZ-9PTyF1BIlwbk4SVDTpJJR3HNBQZjQL5q8ysyBHsnYIjveVRwQ"
    />

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
</template>
