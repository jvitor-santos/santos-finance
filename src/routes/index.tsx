import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'

import { useUser } from '@hooks/useUser'
import { useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
// import { useState } from 'react'

export function Routes() {
  const { userId } = useUser()
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  return (
    <NavigationContainer theme={theme}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      {userId !== '' ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
