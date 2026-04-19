import { ui, defaultLang, type Lang } from './ui'

export type { Lang } from './ui'
export type UIKey = keyof typeof ui['en'] | keyof typeof ui['es']

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as Lang
  return defaultLang
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    // Cast key to a more specific type for direct access, assuming UIKey covers these.
    // The original logic for fallback (??) is preserved.
    return (ui[lang][key as keyof typeof ui['en']] ?? ui[defaultLang][key as keyof typeof ui['en']]) ?? String(key)
  }
}

export function getRelativeLocaleUrl(lang: Lang, path: string) {
  return `/${lang}${path.startsWith('/') ? path : '/' + path}`
}

/** Alias con argumentos (path, lang) como en el plan. */
export function getLocalizedPath(path: string, lang: Lang) {
  return getRelativeLocaleUrl(lang, path)
}
