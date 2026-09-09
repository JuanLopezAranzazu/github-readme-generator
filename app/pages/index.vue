<script setup lang="ts">
import { marked } from 'marked'
import { SKILL_GROUPS, SOCIAL_OPTIONS, STAT_THEMES } from '~/composables/useReadmeConstants'

const { state, markdown, reset, toggleSkill } = useReadmeGenerator()
const toast = useToast()

const view = ref<'preview' | 'markdown'>('preview')

const renderedHtml = computed(() => marked.parse(markdown.value, { async: false }) as string)

const sectionItems = [
  { key: 'header', label: 'Encabezado', icon: 'i-lucide-heading' },
  { key: 'about', label: 'Sobre mí', icon: 'i-lucide-user' },
  { key: 'skills', label: 'Tecnologías', icon: 'i-lucide-wrench' },
  { key: 'socials', label: 'Redes sociales', icon: 'i-lucide-share-2' },
  { key: 'stats', label: 'Estadísticas GitHub', icon: 'i-lucide-bar-chart-3' },
  { key: 'topLangs', label: 'Lenguajes más usados', icon: 'i-lucide-code' },
  { key: 'streak', label: 'Racha de contribuciones', icon: 'i-lucide-flame' },
  { key: 'trophies', label: 'Trofeos', icon: 'i-lucide-trophy' },
  { key: 'profileViews', label: 'Contador de visitas', icon: 'i-lucide-eye' },
  { key: 'support', label: 'Apóyame (donaciones)', icon: 'i-lucide-coffee' }
] as const

async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(markdown.value)
    toast.add({
      title: 'Copiado',
      description: 'El README.md se copió al portapapeles.',
      icon: 'i-lucide-check',
      color: 'success'
    })
  } catch {
    toast.add({
      title: 'No se pudo copiar',
      description: 'Tu navegador bloqueó el acceso al portapapeles.',
      icon: 'i-lucide-x',
      color: 'error'
    })
  }
}

function downloadMarkdown() {
  const blob = new Blob([markdown.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'README.md'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  toast.add({
    title: 'Descargado',
    description: 'README.md se guardó en tu equipo.',
    icon: 'i-lucide-download',
    color: 'success'
  })
}

function handleReset() {
  reset()
  toast.add({ title: 'Formulario reiniciado', icon: 'i-lucide-rotate-ccw' })
}
</script>

<template>
  <UContainer class="py-8 lg:py-10">
    <div class="mb-8 text-center max-w-2xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">
        Generador de README para tu perfil de GitHub
      </h1>
      <p class="mt-2 text-muted">
        Completa tus datos, elige las secciones que quieres mostrar y obtén un
        <code>README.md</code> listo para tu repositorio de perfil
        (<code>usuario/usuario</code>). Copia o descarga el resultado con un clic.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- FORM -->
      <div class="space-y-6 order-2 lg:order-1">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon
                name="i-lucide-user-circle"
                class="size-5"
              />
              Información básica
            </div>
          </template>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField
              label="Usuario de GitHub"
              required
            >
              <UInput
                v-model="state.githubUsername"
                placeholder="octocat"
                icon="i-simple-icons-github"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Nombre">
              <UInput
                v-model="state.name"
                placeholder="Tu nombre"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Pronombres (opcional)">
              <UInput
                v-model="state.pronouns"
                placeholder="ella/she, él/he..."
                class="w-full"
              />
            </UFormField>
            <UFormField label="Título / rol">
              <UInput
                v-model="state.title"
                placeholder="Desarrollador/a Full Stack"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Ubicación"
              class="sm:col-span-2"
            >
              <UInput
                v-model="state.location"
                placeholder="Ciudad, País"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Bio corta"
              class="sm:col-span-2"
            >
              <UTextarea
                v-model="state.bio"
                :rows="2"
                class="w-full"
              />
            </UFormField>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon
                name="i-lucide-sparkles"
                class="size-5"
              />
              Sobre mí (detalles)
            </div>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="🔭 Trabajando actualmente en">
              <UInput
                v-model="state.currentWork"
                class="w-full"
              />
            </UFormField>
            <UFormField label="🌱 Aprendiendo">
              <UInput
                v-model="state.currentLearning"
                class="w-full"
              />
            </UFormField>
            <UFormField label="👯 Quiero colaborar en">
              <UInput
                v-model="state.collaborateOn"
                class="w-full"
              />
            </UFormField>
            <UFormField label="🤝 Puedo ayudar con">
              <UInput
                v-model="state.helpWith"
                class="w-full"
              />
            </UFormField>
            <UFormField label="💬 Pregúntame sobre">
              <UInput
                v-model="state.askMeAbout"
                class="w-full"
              />
            </UFormField>
            <UFormField label="⚡ Dato curioso">
              <UInput
                v-model="state.funFact"
                class="w-full"
              />
            </UFormField>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon
                name="i-lucide-wrench"
                class="size-5"
              />
              Tecnologías
              <UBadge
                v-if="state.skills.length"
                color="primary"
                variant="subtle"
                size="sm"
              >
                {{ state.skills.length }}
              </UBadge>
            </div>
          </template>
          <div class="space-y-4">
            <div
              v-for="group in SKILL_GROUPS"
              :key="group.label"
            >
              <p class="text-sm font-medium text-muted mb-2">
                {{ group.label }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="skill in group.skills"
                  :key="skill.slug"
                  size="xs"
                  :color="state.skills.includes(skill.slug) ? 'primary' : 'neutral'"
                  :variant="state.skills.includes(skill.slug) ? 'solid' : 'outline'"
                  @click="toggleSkill(skill.slug)"
                >
                  {{ skill.label }}
                </UButton>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon
                name="i-lucide-share-2"
                class="size-5"
              />
              Redes sociales
            </div>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField
              v-for="social in SOCIAL_OPTIONS"
              :key="social.key"
              :label="social.label"
            >
              <UInput
                v-model="state.socials[social.key]"
                :icon="social.icon"
                :placeholder="social.placeholder"
                class="w-full"
              />
            </UFormField>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon
                name="i-lucide-layout-list"
                class="size-5"
              />
              Secciones a incluir
            </div>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <USwitch
              v-for="item in sectionItems"
              :key="item.key"
              v-model="state.sections[item.key]"
              :label="item.label"
            />
          </div>

          <div
            v-if="state.sections.support"
            class="mt-4"
          >
            <UFormField label="Enlace de apoyo (Buy Me a Coffee, Ko-fi, PayPal...)">
              <UInput
                v-model="state.supportUrl"
                placeholder="https://buymeacoffee.com/tuusuario"
                class="w-full"
              />
            </UFormField>
          </div>

          <div
            v-if="state.sections.stats || state.sections.topLangs || state.sections.streak || state.sections.trophies"
            class="mt-4"
          >
            <UFormField label="Tema de las tarjetas de estadísticas">
              <USelect
                v-model="state.statsTheme"
                :items="STAT_THEMES"
                value-key="value"
                label-key="label"
                class="w-full sm:w-64"
              />
            </UFormField>
          </div>
        </UCard>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-rotate-ccw"
          @click="handleReset"
        >
          Reiniciar formulario
        </UButton>
      </div>

      <!-- PREVIEW -->
      <div class="order-1 lg:order-2 lg:sticky lg:top-6">
        <UCard :ui="{ body: 'p-0' }">
          <template #header>
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <UTabs
                v-model="view"
                :items="[
                  { label: 'Vista previa', value: 'preview', icon: 'i-lucide-eye' },
                  { label: 'Markdown', value: 'markdown', icon: 'i-lucide-code' }
                ]"
                :content="false"
                size="xs"
                class="w-auto"
              />
              <div class="flex gap-2">
                <UButton
                  color="neutral"
                  variant="subtle"
                  icon="i-lucide-copy"
                  size="sm"
                  @click="copyMarkdown"
                >
                  Copiar
                </UButton>
                <UButton
                  color="primary"
                  icon="i-lucide-download"
                  size="sm"
                  @click="downloadMarkdown"
                >
                  Descargar
                </UButton>
              </div>
            </div>
          </template>

          <div class="max-h-[75vh] overflow-y-auto">
            <div
              v-if="view === 'preview'"
              class="markdown-preview p-5"
              v-html="renderedHtml"
            />
            <pre
              v-else
              class="p-5 text-xs sm:text-sm whitespace-pre-wrap break-words font-mono"
            >{{ markdown }}</pre>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
