import { fetchAndSaveTranslations } from '@/translations/utils'

export const state = () => ({
  locale: 'fr-FR'
})

export const mutations = {
  setLocale: (state, locale) => state.locale = locale
}

export const actions = {
  async setLocale({ commit }, locale) {
    await fetchAndSaveTranslations(locale)
    commit('setLocale', locale)
  }
}
