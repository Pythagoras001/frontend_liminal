<script setup lang="ts">
import { computed, useId } from 'vue'
import { useLevelClass } from '@/features/levelClass/hooks/useLevelClass'
import { getClassNumberLabel } from '@/features/levelClass/model/LevelClass'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'

interface Props {
  label: string
  /** Mensaje de validación mostrado bajo el control. */
  error?: string
}

withDefaults(defineProps<Props>(), {
  error: undefined,
})

/** Identificador de la clase elegida; `null` mientras no haya selección. */
const model = defineModel<number | null>({ required: true })

const selectId = useId()
const errorId = useId()

const { data: levelClasses, isPending, isError } = useLevelClass()

/** Del catálogo solo se usan la clase y el tipo para identificar la opción. */
const options = computed(() =>
  (levelClasses.value ?? []).map((levelClass) => ({
    value: String(levelClass.id),
    label: `${getClassNumberLabel(levelClass.classNumber)} · ${getSurvivalClassTypeLabel(levelClass.type)}`,
  })),
)

const placeholder = computed(() => {
  if (isPending.value) return 'Cargando clases…'
  if (isError.value) return 'No se pudieron cargar las clases'

  return 'Selecciona una clase'
})

/** `<select>` trabaja con cadenas; el borrador guarda el identificador numérico. */
const selectedId = computed<string>({
  get: () => (model.value === null ? '' : String(model.value)),
  set: (value) => {
    model.value = value === '' ? null : Number(value)
  },
})
</script>

<template>
  <div class="space-y-2">
    <label
      :for="selectId"
      class="block font-mono text-xs tracking-[0.18em] text-white/50 uppercase"
    >
      {{ label }}
    </label>

    <div class="relative">
      <select
        :id="selectId"
        v-model="selectedId"
        :disabled="isPending || isError"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? errorId : undefined"
        class="w-full cursor-pointer appearance-none rounded-sm border bg-liminal-surface px-4 py-2.5 pr-10 text-sm tracking-wide text-neutral-100 transition-colors focus:border-liminal-primary focus:ring-1 focus:ring-liminal-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        :class="error ? 'border-red-500/60' : 'border-white/10'"
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
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white/40"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>

    <p v-if="error" :id="errorId" role="alert" class="font-mono text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>
