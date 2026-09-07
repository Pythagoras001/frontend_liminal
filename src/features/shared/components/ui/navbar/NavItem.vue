<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="text-sm font-semibold tracking-[0.15em] text-white/90 uppercase outline-none transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>
