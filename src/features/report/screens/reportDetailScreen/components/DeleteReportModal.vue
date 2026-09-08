<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId } from 'vue'

interface Props {
  /** Título del expediente, para que el aviso diga qué se va a borrar. */
  reportTitle: string
  /** La petición está en curso; solo cambia el texto del botón. */
  pending?: boolean
  /** Mensaje de error del servidor. */
  errorMessage?: string
}

withDefaults(defineProps<Props>(), {
  pending: false,
  errorMessage: undefined,
})

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const titleId = useId()
const descriptionId = useId()

/** El diálogo se cierra con Escape, como espera cualquier modal. */
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <!-- El clic en el fondo cierra; `self` evita que lo hagan los clics del panel. -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descriptionId"
        class="w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-liminal-surface text-neutral-100 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
      >
        <header
          class="flex items-center justify-between border-b border-white/10 bg-liminal-bg px-6 py-4"
        >
          <p :id="titleId" class="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              class="inline-block h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]"
            ></span>
            <span class="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
              Expediente // Eliminar
            </span>
          </p>

          <button
            type="button"
            aria-label="Cerrar"
            class="rounded-sm p-1 font-mono text-base text-white/50 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
            @click="emit('close')"
          >
            ✕
          </button>
        </header>

        <div :id="descriptionId" class="space-y-4 p-6">
          <p class="text-sm leading-relaxed text-neutral-300">
            Vas a retirar del archivo
            <strong class="font-semibold text-white uppercase">{{ reportTitle }}</strong>
            junto a todas sus evidencias.
          </p>

          <p class="font-mono text-xs tracking-[0.12em] text-red-300/80 uppercase">
            Esta acción no se puede deshacer.
          </p>

          <p
            v-if="errorMessage"
            role="alert"
            class="border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300"
          >
            {{ errorMessage }}
          </p>
        </div>

        <div
          class="flex items-center justify-end gap-3 border-t border-white/10 bg-liminal-bg px-6 py-4"
        >
          <button
            type="button"
            class="rounded-sm border border-white/15 px-4 py-2 font-mono text-xs tracking-[0.18em] text-white/60 uppercase outline-none transition-colors hover:border-white/40 hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary"
            @click="emit('close')"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="rounded-sm bg-red-600 px-5 py-2 font-mono text-xs font-bold tracking-[0.18em] text-white uppercase outline-none transition-all hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:scale-95"
            @click="emit('confirm')"
          >
            {{ pending ? 'Eliminando…' : 'Eliminar expediente' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
