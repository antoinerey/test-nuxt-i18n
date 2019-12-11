import { fetchAndSaveTranslations } from '@/translations/utils'

export default function i18nPlugin({ store }) {
  return fetchAndSaveTranslations(store.state.locale)
}
