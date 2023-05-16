import { ReactNode, createContext, useState, useEffect } from 'react'

import * as Localization from 'expo-localization'

import i18n from '@locales/index'

interface LanguageContextDataProps {
  language: string
}

interface LanguageContextProviderProps {
  children: ReactNode
}

export const LanguageContext = createContext<LanguageContextDataProps>(
  {} as LanguageContextDataProps,
)

export function LanguageContextProvider({
  children,
}: LanguageContextProviderProps) {
  const [language, setLanguage] = useState('')

  i18n.defaultLocale = 'pt_BR'
  i18n.locale = language

  useEffect(() => {
    const deviceLanguage = Localization.locale.replace('-', '_')

    if (deviceLanguage) {
      setLanguage(deviceLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  )
}
