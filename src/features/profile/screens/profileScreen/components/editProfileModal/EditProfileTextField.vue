<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  label: string
  type?: 'text' | 'email'
  placeholder?: string
  /** Mensaje de validación mostrado bajo el control. */
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: undefined,
  error: undefined,
})

const value = defineModel<string>({ required: true })

const inputId = useId()
const errorId = useId()
</script>

<template>
  <div class="space-y-2">
    <label
      :for="inputId"
      class="block font-mono text-xs font-medium tracking-[0.18em] text-white/50 uppercase"
    >
      {{ label }}
    </label>

    <input
      :id="inputId"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? errorId : undefined"
      class="w-full rounded-sm border bg-liminal-surface px-3.5 py-2.5 font-mono text-sm text-neutral-100 placeholder-white/30 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
      :class="error ? 'border-red-500/60' : 'border-white/10'"
    />

    <p v-if="error" :id="errorId" role="alert" class="font-mono text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>
