<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})

const title = 'Generador de README para GitHub'
const description = 'Crea el README.md de tu perfil de GitHub con vista previa en vivo. Cópialo o descárgalo en segundos. Hecho con Nuxt y Nuxt UI.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader :toggle="false">
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1">
          <UIcon name="i-simple-icons-github" class="size-6" />
          README Generator
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
        <UButton
          to="https://github.com"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
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
