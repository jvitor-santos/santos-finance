import { useContext } from 'react'

import { LanguageContext } from '@contexts/LanguageContext'

export function useLanguage() {
  const context = useContext(LanguageContext)

  return context
}
