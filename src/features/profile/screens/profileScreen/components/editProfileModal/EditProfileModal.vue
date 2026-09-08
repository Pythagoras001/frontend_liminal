<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, shallowRef, useId } from 'vue'
import type { AuthUser } from '@/features/login/model/AuthUser'
import type { EditProfileDraft } from '@/features/profile/model/EditProfileDraft'
import {
  createEditProfileDraft,
  hasProfileChanges,
} from '@/features/profile/model/EditProfileDraft'
import EditProfileAvatarField from './EditProfileAvatarField.vue'
import EditProfileTextField from './EditProfileTextField.vue'

interface Props {
  /** Perfil que se está editando; rellena el formulario al abrirlo. */
  user: AuthUser
  /** Deshabilita el envío mientras la actualización está en curso. */
  pending?: boolean
  /** Mensaje de error del servidor. */
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  errorMessage: undefined,
})

const emit = defineEmits<{
  submit: [draft: EditProfileDraft]
  close: []
}>()

const titleId = useId()

const form = reactive(createEditProfileDraft(props.user))
/** Las validaciones solo se muestran tras un primer intento de envío. */
const submitted = shallowRef(false)

const userNameError = computed(() =>
  submitted.value && !form.userName.trim() ? 'El alias no puede quedar vacío.' : undefined,
)

const emailError = computed(() => {
  if (!submitted.value) {
    return undefined
  }
  const email = form.email.trim()
  if (!email) {
    return 'El correo electrónico no puede quedar vacío.'
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? undefined : 'Introduce un correo válido.'
})

/** Guardar sin tocar nada no aportaría nada, así que el botón queda inerte. */
const canSubmit = computed(() => !props.pending && hasProfileChanges(form, props.user))

function handleSubmit() {
  submitted.value = true
  if (userNameError.value || emailError.value || !canSubmit.value) {
    return
  }

  emit('submit', {
    userName: form.userName.trim(),
    email: form.email.trim(),
    avatar: form.avatar,
  })
}

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
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="w-full max-w-lg overflow-hidden rounded-sm border border-white/10 bg-liminal-surface text-neutral-100 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
      >
        <header
          class="flex items-center justify-between border-b border-white/10 bg-liminal-bg px-6 py-4"
        >
          <p :id="titleId" class="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              class="inline-block h-2 w-2 rounded-full bg-liminal-primary shadow-[0_0_6px_#ffb800]"
            ></span>
            <span class="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
              Expediente // Editar perfil
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

        <form novalidate @submit.prevent="handleSubmit">
          <div class="space-y-6 p-6">
            <EditProfileAvatarField
              v-model="form.avatar"
              :current-image-url="user.profileImage?.mediumUrl"
            />

            <EditProfileTextField
              v-model="form.userName"
              label="Alias de explorador / Nombre de usuario"
              placeholder="USER44"
              :error="userNameError"
            />

            <EditProfileTextField
              v-model="form.email"
              type="email"
              label="Correo electrónico"
              placeholder="user44@liminal.com"
              :error="emailError"
            />

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
              type="submit"
              :disabled="!canSubmit"
              class="rounded-sm bg-liminal-primary px-5 py-2 font-mono text-xs font-bold tracking-[0.18em] text-liminal-on-primary uppercase outline-none transition-all hover:bg-liminal-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-liminal-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-liminal-primary"
            >
              {{ pending ? 'Guardando…' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
