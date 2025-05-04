import { createI18n, LocaleMessages } from 'vue-i18n'
import { useStorage } from '@/composables/storage'

type Context = Record<string, Record<string, string>>
const context: Context = import.meta.glob('./assets/locales/*.json', { eager: true })
const files = Object.keys(context)

function loadLocaleMessages(): LocaleMessages<Context> {
  const messages: LocaleMessages<Context> = {}
  files.forEach(key => {
    const matched = /([A-Za-z0-9-_]+)\.([a-z]{2})/i.exec(key)
    if (matched && matched.length > 1) {
      const locale = matched[2]
      messages[locale] = {
        ...messages[locale],
        [matched[1]]: context[key],
      }
    }
  })
  return messages
}

const { getLocale } = useStorage()

const messages = loadLocaleMessages()
const locales = Object.keys(messages)
const userPreference = getLocale()
const validPreference = userPreference && locales.includes(userPreference)

export default createI18n({
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  locale: validPreference ? userPreference : 'en',
  messages: loadLocaleMessages(),
  warnHtmlMessage: false,
})
