<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)

useSeoMeta({
  title: is404.value ? 'Página no encontrada' : 'Ocurrió un error',
  robots: 'noindex'
})
</script>

<template>
  <UApp>
    <UHeader :toggle="false">
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-bold text-lg focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
        >
          <UIcon
            name="i-simple-icons-github"
            class="size-6"
          />
          README Generator
        </NuxtLink>
      </template>
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <UContainer class="py-16 sm:py-24">
        <UError
          :error="error"
          :icon="is404 ? 'i-lucide-file-question' : 'i-lucide-triangle-alert'"
          :ui="{
            root: 'text-center flex flex-col items-center gap-3',
            leadingIcon: 'size-16 sm:size-20 text-muted mb-2',
            statusCode: 'text-primary font-bold',
            statusMessage: 'text-2xl sm:text-3xl font-bold tracking-tight',
            message: 'text-muted max-w-md'
          }"
        >
          <template #statusMessage>
            {{ is404 ? 'Página no encontrada' : 'Algo salió mal' }}
          </template>
          <template #message>
            {{ is404
              ? 'La página que buscas no existe o fue movida. Vuelve al generador de README.'
              : (error?.message || 'Ocurrió un error inesperado. Intenta de nuevo.') }}
          </template>
          <template #links>
            <UButton
              to="/"
              icon="i-lucide-arrow-left"
              size="lg"
              color="primary"
            >
              Volver al inicio
            </UButton>
          </template>
        </UError>
      </UContainer>
    </UMain>

    <USeparator icon="i-lucide-github" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Generador de README • © {{ new Date().getFullYear() }}
        </p>
      </template>
      <template #right>
        <p class="text-sm text-muted">
          Hecho con Nuxt + Nuxt UI
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
