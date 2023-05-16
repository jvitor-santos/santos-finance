import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { Debits } from '@screens/Debits'
import { Months } from '@screens/Months'
import { Receipts } from '@screens/Receipts'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { UserOptions } from '@screens/UserOptions'
import { Yers } from '@screens/Yers'

type TAppRoutes = {
  signIn: undefined
  signUp: undefined
  home: undefined
  debits: undefined
  userOptions: undefined
  months: undefined
  yers: undefined
  receipts: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<TAppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<TAppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="userOptions" component={UserOptions} />
      <Screen name="receipts" component={Receipts} />
      <Screen name="yers" component={Yers} />
      <Screen name="months" component={Months} />
      <Screen name="debits" component={Debits} />
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
