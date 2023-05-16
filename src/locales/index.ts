import { I18n } from 'i18n-js'

import pt_BR from './pt_BR'

const languages = {
  pt_BR,
}
const i18n = new I18n(languages)

i18n.enableFallback = true

export default i18n
