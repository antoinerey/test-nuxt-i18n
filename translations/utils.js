import zip from 'lodash.zip'
import flat from 'lodash.flatten'

export const fetchAndSaveTranslations = async locale => {
  if (process.server && global.translations && global.translations[locale]) {
    return // Only load our translations once (per locale) on server-side.
  }

  const { default: translations } = await import(`@/lang/${locale}.json`)

  if (process.server) {
    global.translations = global.translations || {}
    global.translations[locale] = translations
  }

  if (process.client) {
    window.translations = window.translations || {}
    window.translations[locale] = translations
  }
}

export const tokenize = (message, keys = []) => {
  if (keys.length === 0) {
    return [message]
  }

  return keys
    .map(key => `{${key}}`)
    .reduce((messages, slot) => {
      return flat(messages.map(message => {
        const parts = message.split(slot)

        if (parts.length === 1) {
          return parts
        }

        const slots = Array
          .from({ length: parts.length - 1 })
          .fill(slot)

        return flat(zip(parts, slots))
      })).filter(Boolean)
    }, [message])
}
