<script setup lang="ts">
interface Props {
  /** Un párrafo por entrada del relato. */
  paragraphs: string[]
}

defineProps<Props>()
</script>

<template>
  <section aria-labelledby="registro-hallazgo-titulo" class="pt-2">
    <h2
      id="registro-hallazgo-titulo"
      class="mb-4 text-lg font-bold tracking-wide text-white uppercase sm:text-xl"
    >
      Registro del hallazgo
    </h2>

    <div
      class="max-w-3xl space-y-4 text-sm leading-relaxed font-light text-neutral-300 sm:text-base"
    >
      <p
        v-for="(paragraph, index) in paragraphs"
        :key="index"
        :class="{ 'text-neutral-400': index > 0 }"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>
