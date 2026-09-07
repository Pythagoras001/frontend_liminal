<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useObjectUrl } from '@/features/shared/hooks/useObjectUrl'

interface Props {
  file: File
  /** Vista ampliada para la evidencia principal; las de galería son miniaturas. */
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
})

const emit = defineEmits<{
  remove: []
}>()

const previewUrl = useObjectUrl(toRef(props, 'file'))

const size = computed(() => {
  const kb = props.file.size / 1024
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`
})
</script>

<template>
  <figure
    class="relative overflow-hidden rounded border border-white/10 bg-liminal-surface"
    :class="featured ? '' : 'flex items-center gap-3 p-2'"
  >
    <img
      v-if="previewUrl"
      :src="previewUrl"
      :alt="`Vista previa de ${file.name}`"
      class="bg-black object-cover"
      :class="featured ? 'aspect-[16/9] w-full' : 'h-14 w-20 flex-shrink-0 rounded-sm'"
    />

    <figcaption
      class="flex items-center justify-between gap-3"
      :class="featured ? 'px-4 py-3' : 'min-w-0 flex-1 pr-1'"
    >
      <span class="min-w-0">
        <span class="block truncate font-mono text-xs text-neutral-200">{{ file.name }}</span>
        <span class="font-mono text-[11px] text-white/40">{{ size }}</span>
      </span>

      <button
        type="button"
        class="flex-shrink-0 rounded border border-white/10 px-2.5 py-1 font-mono text-[11px] tracking-wider text-white/50 uppercase outline-none transition-colors hover:border-red-500/50 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        :aria-label="`Quitar la imagen ${file.name}`"
        @click="emit('remove')"
      >
        Quitar
      </button>
    </figcaption>
  </figure>
</template>
