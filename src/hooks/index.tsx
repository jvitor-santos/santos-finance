import { ReactNode } from 'react'

import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { LanguageContextProvider } from '@contexts/LanguageContext'

import { UserContextProvider } from '@contexts/UserContexts'

import { theme } from '@theme/index'

interface AppProviderProps {
  children?: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <LanguageContextProvider>
      <SafeAreaProvider>
        <UserContextProvider>
          <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
        </UserContextProvider>
      </SafeAreaProvider>
    </LanguageContextProvider>
  )
}
