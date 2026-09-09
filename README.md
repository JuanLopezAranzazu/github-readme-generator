# Generador de README para GitHub

Aplicación web responsive hecha con **Nuxt 4** y **Nuxt UI** para crear el
`README.md` del perfil de GitHub (el repo especial `tu-usuario/tu-usuario`).

## Características

- Formulario con nombre, bio, ubicación, "sobre mí", tecnologías, redes sociales, etc.
- Selector de tecnologías por categorías (usa iconos de [skillicons.dev](https://skillicons.dev)).
- Secciones activables: encabezado, sobre mí, tecnologías, redes sociales,
  estadísticas de GitHub, lenguajes más usados, racha de contribuciones,
  trofeos, contador de visitas y sección de apoyo/donaciones.
- Selector de tema para las tarjetas de estadísticas (github-readme-stats).
- **Vista previa en vivo** del Markdown renderizado.
- Pestaña para ver el **código Markdown** crudo.
- Botones para **Copiar** al portapapeles y **Descargar** como `README.md`.
- Diseño responsive (formulario y preview se apilan en móvil, en dos
  columnas con preview sticky en escritorio).
- Modo claro/oscuro incluido (Nuxt UI).

## Requisitos

- Node.js 20 o superior

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

Abre http://localhost:3000

## Build de producción

```bash
pnpm build
pnpm preview
```

## Estructura relevante

```
app/
  composables/
    useReadmeConstants.ts   # listas de skills, redes sociales y temas
    useReadmeGenerator.ts   # estado reactivo + generación del markdown
  pages/
    index.vue               # formulario + preview + copiar/descargar
  app.vue                    # layout (header/footer)
  app.config.ts               # color primario de Nuxt UI
  assets/css/main.css         # estilos del preview del markdown
```

## Personalizar

- Agrega más tecnologías en `SKILL_GROUPS` (usa cualquier slug de
  https://skillicons.dev).
- Agrega más redes sociales en `SOCIAL_OPTIONS`.
- Cambia el color principal en `app/app.config.ts`.
- Ajusta el formato del README generado en la función `buildMarkdown` de
  `useReadmeGenerator.ts`.
