<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  id: string
  label: string
  autocomplete?: 'current-password' | 'new-password'
  placeholder?: string
  invalid?: boolean
  describedBy?: string
}

withDefaults(defineProps<Props>(), {
  autocomplete: 'current-password',
  placeholder: undefined,
  invalid: false,
  describedBy: undefined,
})

const modelValue = defineModel<string>({ required: true })

const visible = ref(false)

const inputType = computed(() => (visible.value ? 'text' : 'password'))

function toggleVisibility() {
  visible.value = !visible.value
}
</script>

<template>
  <div class="space-y-1.5">
    <label
      :for="id"
      class="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase"
    >
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <input
        :id="id"
        v-model="modelValue"
        :type="inputType"
        :name="id"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :aria-invalid="invalid"
        :aria-describedby="describedBy"
        required
        class="w-full border bg-liminal-surface/90 px-3.5 py-2.5 pr-11 text-sm tracking-widest text-neutral-200 placeholder-neutral-600 outline-none transition-colors focus:border-neutral-500"
        :class="invalid ? 'border-red-400/70' : 'border-liminal-surface-raised'"
      />
      <button
        type="button"
        class="absolute right-2 flex h-8 w-8 items-center justify-center rounded p-1 text-neutral-400 outline-none transition-colors hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
        :aria-label="visible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        :aria-pressed="visible"
        @click="toggleVisibility"
      >
        <svg v-if="!visible" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
          />
          <path
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
          />
        </svg>
        <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M3 3l18 18M10.584 10.587a2 2 0 002.828 2.83M9.363 5.365A9.466 9.466 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.523 10.523 0 01-4.293 5.309M6.228 6.228A10.45 10.45 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.53 9.53 0 004.132-.928"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
