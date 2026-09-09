export interface SkillOption {
  slug: string
  label: string
}

export interface SocialOption {
  key: string
  label: string
  icon: string
  color: string
  placeholder: string
  /** Build the target URL from the raw value the user typed */
  toUrl: (value: string) => string
}

export interface ThemeOption {
  value: string
  label: string
}

// skillicons.dev slugs, grouped loosely so the picker isn't one giant flat list
export const SKILL_GROUPS: { label: string, skills: SkillOption[] }[] = [
  {
    label: 'Lenguajes',
    skills: [
      { slug: 'js', label: 'JavaScript' },
      { slug: 'ts', label: 'TypeScript' },
      { slug: 'py', label: 'Python' },
      { slug: 'java', label: 'Java' },
      { slug: 'cs', label: 'C#' },
      { slug: 'cpp', label: 'C++' },
      { slug: 'c', label: 'C' },
      { slug: 'php', label: 'PHP' },
      { slug: 'go', label: 'Go' },
      { slug: 'rust', label: 'Rust' },
      { slug: 'kotlin', label: 'Kotlin' },
      { slug: 'swift', label: 'Swift' },
      { slug: 'dart', label: 'Dart' },
      { slug: 'ruby', label: 'Ruby' },
      { slug: 'r', label: 'R' }
    ]
  },
  {
    label: 'Frontend',
    skills: [
      { slug: 'html', label: 'HTML' },
      { slug: 'css', label: 'CSS' },
      { slug: 'sass', label: 'Sass' },
      { slug: 'tailwind', label: 'Tailwind CSS' },
      { slug: 'bootstrap', label: 'Bootstrap' },
      { slug: 'react', label: 'React' },
      { slug: 'vue', label: 'Vue' },
      { slug: 'nuxt', label: 'Nuxt' },
      { slug: 'next', label: 'Next.js' },
      { slug: 'svelte', label: 'Svelte' },
      { slug: 'angular', label: 'Angular' },
      { slug: 'vite', label: 'Vite' },
      { slug: 'flutter', label: 'Flutter' }
    ]
  },
  {
    label: 'Backend / Bases de datos',
    skills: [
      { slug: 'nodejs', label: 'Node.js' },
      { slug: 'express', label: 'Express' },
      { slug: 'nestjs', label: 'NestJS' },
      { slug: 'django', label: 'Django' },
      { slug: 'flask', label: 'Flask' },
      { slug: 'laravel', label: 'Laravel' },
      { slug: 'spring', label: 'Spring' },
      { slug: 'mysql', label: 'MySQL' },
      { slug: 'postgres', label: 'PostgreSQL' },
      { slug: 'mongodb', label: 'MongoDB' },
      { slug: 'redis', label: 'Redis' },
      { slug: 'sqlite', label: 'SQLite' },
      { slug: 'graphql', label: 'GraphQL' },
      { slug: 'firebase', label: 'Firebase' },
      { slug: 'supabase', label: 'Supabase' }
    ]
  },
  {
    label: 'DevOps / Herramientas',
    skills: [
      { slug: 'git', label: 'Git' },
      { slug: 'github', label: 'GitHub' },
      { slug: 'gitlab', label: 'GitLab' },
      { slug: 'docker', label: 'Docker' },
      { slug: 'kubernetes', label: 'Kubernetes' },
      { slug: 'aws', label: 'AWS' },
      { slug: 'gcp', label: 'Google Cloud' },
      { slug: 'azure', label: 'Azure' },
      { slug: 'vercel', label: 'Vercel' },
      { slug: 'linux', label: 'Linux' },
      { slug: 'bash', label: 'Bash' },
      { slug: 'nginx', label: 'Nginx' },
      { slug: 'postman', label: 'Postman' },
      { slug: 'figma', label: 'Figma' },
      { slug: 'vscode', label: 'VS Code' }
    ]
  }
]

export const ALL_SKILLS: SkillOption[] = SKILL_GROUPS.flatMap(g => g.skills)

export const SOCIAL_OPTIONS: SocialOption[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'i-simple-icons-linkedin',
    color: '0A66C2',
    placeholder: 'tu-usuario',
    toUrl: v => `https://linkedin.com/in/${v}`
  },
  {
    key: 'twitter',
    label: 'X / Twitter',
    icon: 'i-simple-icons-x',
    color: '000000',
    placeholder: 'tu_usuario',
    toUrl: v => `https://x.com/${v}`
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: 'i-simple-icons-instagram',
    color: 'E4405F',
    placeholder: 'tu_usuario',
    toUrl: v => `https://instagram.com/${v}`
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: 'i-simple-icons-youtube',
    color: 'FF0000',
    placeholder: '@tucanal',
    toUrl: v => `https://youtube.com/${v.startsWith('@') ? v : `@${v}`}`
  },
  {
    key: 'devto',
    label: 'Dev.to',
    icon: 'i-simple-icons-devdotto',
    color: '0A0A0A',
    placeholder: 'tu-usuario',
    toUrl: v => `https://dev.to/${v}`
  },
  {
    key: 'discord',
    label: 'Discord',
    icon: 'i-simple-icons-discord',
    color: '5865F2',
    placeholder: 'usuario o server',
    toUrl: v => v
  },
  {
    key: 'website',
    label: 'Sitio web',
    icon: 'i-lucide-globe',
    color: '4B5563',
    placeholder: 'https://tusitio.com',
    toUrl: v => v
  },
  {
    key: 'email',
    label: 'Email',
    icon: 'i-lucide-mail',
    color: 'D14836',
    placeholder: 'tu@email.com',
    toUrl: v => `mailto:${v}`
  }
]

export const STAT_THEMES: ThemeOption[] = [
  { value: 'default', label: 'Default' },
  { value: 'dark', label: 'Dark' },
  { value: 'radical', label: 'Radical' },
  { value: 'merko', label: 'Merko' },
  { value: 'gruvbox', label: 'Gruvbox' },
  { value: 'tokyonight', label: 'Tokyo Night' },
  { value: 'onedark', label: 'One Dark' },
  { value: 'cobalt', label: 'Cobalt' },
  { value: 'synthwave', label: 'Synthwave' },
  { value: 'highcontrast', label: 'High Contrast' },
  { value: 'dracula', label: 'Dracula' }
]
