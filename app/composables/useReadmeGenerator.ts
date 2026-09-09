import { SOCIAL_OPTIONS } from './useReadmeConstants'

export interface ReadmeState {
  githubUsername: string
  name: string
  pronouns: string
  title: string
  bio: string
  location: string
  currentWork: string
  currentLearning: string
  collaborateOn: string
  helpWith: string
  askMeAbout: string
  funFact: string
  skills: string[]
  socials: Record<string, string>
  sections: {
    header: boolean
    about: boolean
    skills: boolean
    stats: boolean
    topLangs: boolean
    streak: boolean
    trophies: boolean
    profileViews: boolean
    socials: boolean
    support: boolean
  }
  statsTheme: string
  supportUrl: string
}

function createDefaultState(): ReadmeState {
  return {
    githubUsername: 'octocat',
    name: 'Tu Nombre',
    pronouns: '',
    title: 'Desarrollador/a Full Stack',
    bio: 'Me apasiona construir productos web rápidos, accesibles y bien diseñados.',
    location: 'Colombia',
    currentWork: 'un proyecto open source',
    currentLearning: 'Nuxt 4 y Nuxt UI',
    collaborateOn: 'proyectos open source de frontend',
    helpWith: 'Vue, Nuxt y TypeScript',
    askMeAbout: 'JavaScript, Vue y desarrollo web',
    funFact: 'Me encanta el café mientras programo ☕',
    skills: ['js', 'ts', 'vue', 'nuxt', 'tailwind', 'nodejs', 'git', 'docker'],
    socials: {},
    sections: {
      header: true,
      about: true,
      skills: true,
      stats: true,
      topLangs: true,
      streak: true,
      trophies: false,
      profileViews: true,
      socials: true,
      support: false
    },
    statsTheme: 'default',
    supportUrl: ''
  }
}

function buildMarkdown(s: ReadmeState): string {
  const lines: string[] = []
  const user = s.githubUsername.trim() || 'octocat'

  if (s.sections.header) {
    lines.push(`# Hola, soy ${s.name || 'tu nombre'} 👋${s.pronouns ? ` <sub>(${s.pronouns})</sub>` : ''}`)
    lines.push('')
    if (s.title) lines.push(`### ${s.title}`)
    lines.push('')
  }

  if (s.sections.profileViews) {
    lines.push(`![Visitor Count](https://komarev.com/ghpvc/?username=${user}&color=blueviolet&style=flat-square&label=Visitas+al+perfil)`)
    lines.push('')
  }

  if (s.sections.about) {
    lines.push('## 🚀 Sobre mí')
    lines.push('')
    if (s.bio) lines.push(`${s.bio}`)
    lines.push('')
    const bullets: string[] = []
    if (s.currentWork) bullets.push(`- 🔭 Actualmente trabajando en **${s.currentWork}**`)
    if (s.currentLearning) bullets.push(`- 🌱 Aprendiendo **${s.currentLearning}**`)
    if (s.collaborateOn) bullets.push(`- 👯 Buscando colaborar en **${s.collaborateOn}**`)
    if (s.helpWith) bullets.push(`- 🤝 Abierto/a a ayudar con **${s.helpWith}**`)
    if (s.askMeAbout) bullets.push(`- 💬 Pregúntame sobre **${s.askMeAbout}**`)
    if (s.location) bullets.push(`- 📍 Ubicado/a en **${s.location}**`)
    if (s.funFact) bullets.push(`- ⚡ Dato curioso: ${s.funFact}`)
    if (bullets.length) {
      lines.push(...bullets)
      lines.push('')
    }
  }

  if (s.sections.socials) {
    const active = SOCIAL_OPTIONS.filter(o => s.socials[o.key]?.trim())
    if (active.length) {
      lines.push('## 🌐 Conecta conmigo')
      lines.push('')
      const badges = active.map((o) => {
        const url = o.toUrl(s.socials[o.key]!.trim())
        const badgeLabel = o.label.replace(/\s/g, '%20')
        const logo = o.icon.replace('i-simple-icons-', '')
        return `[![${o.label}](https://img.shields.io/badge/${badgeLabel}-${o.color}?style=for-the-badge&logo=${logo}&logoColor=white)](${url})`
      })
      lines.push(badges.join(' '))
      lines.push('')
    }
  }

  if (s.sections.skills && s.skills.length) {
    lines.push('## 🛠️ Tecnologías y herramientas')
    lines.push('')
    lines.push(`![Skills](https://skillicons.dev/icons?i=${s.skills.join(',')})`)
    lines.push('')
  }

  const hasStatsRow = s.sections.stats || s.sections.topLangs
  if (hasStatsRow) {
    lines.push('## 📊 Estadísticas de GitHub')
    lines.push('')
    lines.push('<p align="left">')
    if (s.sections.stats) {
      lines.push(`  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${s.statsTheme}&hide_border=true" alt="Estadísticas de GitHub" height="165" />`)
    }
    if (s.sections.topLangs) {
      lines.push(`  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=${s.statsTheme}&hide_border=true" alt="Lenguajes más usados" height="165" />`)
    }
    lines.push('</p>')
    lines.push('')
  }

  if (s.sections.streak) {
    lines.push(`![Racha de GitHub](https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${s.statsTheme}&hide_border=true)`)
    lines.push('')
  }

  if (s.sections.trophies) {
    lines.push(`![Trofeos de GitHub](https://github-profile-trophy.vercel.app/?username=${user}&theme=${s.statsTheme === 'default' ? 'flat' : s.statsTheme}&no-frame=true&row=1&column=7)`)
    lines.push('')
  }

  if (s.sections.support && s.supportUrl.trim()) {
    lines.push('## ☕ Apóyame')
    lines.push('')
    lines.push(`[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](${s.supportUrl.trim()})`)
    lines.push('')
  }

  lines.push('---')
  lines.push(`<p align="center"><i>Generado con ❤️ usando un generador de README hecho en Nuxt + Nuxt UI</i></p>`)

  return lines.join('\n')
}

export function useReadmeGenerator() {
  const state = useState<ReadmeState>('readme-generator-state', createDefaultState)

  const markdown = computed(() => buildMarkdown(state.value))

  function reset() {
    state.value = createDefaultState()
  }

  function toggleSkill(slug: string) {
    const idx = state.value.skills.indexOf(slug)
    if (idx === -1) state.value.skills.push(slug)
    else state.value.skills.splice(idx, 1)
  }

  return { state, markdown, reset, toggleSkill }
}
