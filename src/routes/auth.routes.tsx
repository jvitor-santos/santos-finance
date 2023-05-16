import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { Home } from '@screens/Home'

type TAuthRoutes = {
  home: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<TAuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<TAuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
