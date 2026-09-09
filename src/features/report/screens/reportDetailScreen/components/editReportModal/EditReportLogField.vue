<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  label: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  error: undefined,
})

const value = defineModel<string>({ required: true })

const textareaId = useId()
const errorId = useId()
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label
        :for="textareaId"
        class="block font-mono text-xs tracking-[0.18em] text-white/50 uppercase"
      >
        {{ label }}
      </label>
    </div>

    <textarea
      :id="textareaId"
      v-model="value"
      rows="4"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? errorId : undefined"
      class="w-full resize-none rounded-sm border bg-liminal-surface px-4 py-3 text-sm leading-relaxed tracking-wide text-neutral-200 placeholder-white/30 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
      :class="error ? 'border-red-500/60' : 'border-white/10'"
    ></textarea>

    <p v-if="error" :id="errorId" role="alert" class="font-mono text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>
