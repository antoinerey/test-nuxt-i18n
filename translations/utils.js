import zip from 'lodash.zip'

export const fetchAndSaveTranslations = async locale => {
  // Only load our translations once on server-side.
  if (process.server && global.translations) return

  const { default: translations } = await import(`@/lang/${locale}.json`)

  if (process.server) global.translations = translations
  if (process.client) window.translations = translations
}

export const tokenize = (message, keys = []) => {
  if (keys.length === 0) {
    return [message]
  }

  return keys
    .map(key => `{${key}}`)
    .reduce((messages, slot) => {
      return messages.map(message => {
        const parts = message.split(slot)

        if (parts.length === 1) {
          return parts
        }

        const slots = Array
          .from({ length: parts.length - 1 })
          .fill(slot)

        return zip(parts, slots).flat()
      }).flat().filter(Boolean)
    }, [message])
}
