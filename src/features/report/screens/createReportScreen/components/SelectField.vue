<script setup lang="ts">
import type { SelectOption } from '../data/reportFormOptions'
import FormField from './FormField.vue'

interface Props {
  label: string
  controlId: string
  options: SelectOption[]
  placeholder?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona una opción',
  error: undefined,
})

const model = defineModel<string>({ required: true })
</script>

<template>
  <FormField :label="label" :control-id="controlId" :error="error">
    <div class="relative">
      <select
        :id="controlId"
        v-model="model"
        required
        class="w-full appearance-none rounded border border-white/10 bg-liminal-surface px-4 py-3 pr-10 font-mono text-sm text-neutral-100 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="bg-liminal-surface"
        >
          {{ option.label }}
        </option>
      </select>

      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </FormField>
</template>
