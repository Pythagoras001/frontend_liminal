<script setup lang="ts">
import { computed } from 'vue'
import { useLevelClass } from '@/features/levelClass/hooks/useLevelClass'
import { getClassNumberLabel } from '@/features/levelClass/model/LevelClass'
import { getSurvivalClassTypeLabel } from '@/features/levelClass/model/SurvivalClassType'
import type { SelectOption } from '../data/reportFormOptions'
import SelectField from './SelectField.vue'

interface Props {
  /** Mensaje de validación mostrado bajo el control. */
  error?: string
}

withDefaults(defineProps<Props>(), {
  error: undefined,
})

/** Identificador de la clase elegida; `null` mientras no haya selección. */
const model = defineModel<number | null>({ required: true })

const { data: levelClasses, isPending, isError } = useLevelClass()

/** Del catálogo solo se usan la clase y el tipo para identificar la opción. */
const options = computed<SelectOption[]>(() =>
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
  <SelectField
    v-model="selectedId"
    label="Clase"
    control-id="reporte-clase"
    :options="options"
    :placeholder="placeholder"
    :disabled="isPending || isError"
    :error="error"
  />
</template>
