import { computed, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'
import type { LevelClass } from '@/features/levelClass/model/LevelClass'
import { SURVIVAL_CLASS_TYPE_ORDER } from '@/features/levelClass/model/SurvivalClassType'

/** Tipo presente en el catálogo junto al número de clases que agrupa. */
export interface SurvivalClassTypeOption {
  type: string
  count: number
}

/** Los tipos fuera del enum se ordenan al final, en su orden de aparición. */
function getTypeRank(type: string): number {
  const order: readonly string[] = SURVIVAL_CLASS_TYPE_ORDER
  const index = order.indexOf(type)

  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

/**
 * Deriva del catálogo los tipos disponibles y expone las clases del tipo
 * activo. El tipo seleccionado es la única fuente de verdad: el listado de
 * clases visibles se recalcula a partir de él.
 */
export function useSurvivalClassTypeFilter(classes: MaybeRefOrGetter<LevelClass[]>) {
  const typeOptions = computed<SurvivalClassTypeOption[]>(() => {
    const counts = new Map<string, number>()

    for (const levelClass of toValue(classes)) {
      counts.set(levelClass.type, (counts.get(levelClass.type) ?? 0) + 1)
    }

    return [...counts]
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => getTypeRank(a.type) - getTypeRank(b.type))
  })

  const requestedType = shallowRef<string | null>(null)

  /**
   * Sin selección explícita —o si el tipo elegido desaparece del catálogo—
   * queda activo el primer tipo disponible.
   */
  const activeType = computed(() => {
    const requested = requestedType.value

    if (requested !== null && typeOptions.value.some((option) => option.type === requested)) {
      return requested
    }

    return typeOptions.value[0]?.type ?? null
  })

  const visibleClasses = computed(() =>
    toValue(classes).filter((levelClass) => levelClass.type === activeType.value),
  )

  function selectType(type: string) {
    requestedType.value = type
  }

  return { typeOptions, activeType, visibleClasses, selectType }
}
