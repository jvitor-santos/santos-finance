import { StatusBar } from 'react-native'

import { ScrollView } from 'native-base'

import { SafeAreaView } from 'react-native-safe-area-context'

export function SignIn() {
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <ScrollView
        w="full"
        h="full"
        backgroundColor={'#F1F1F1'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          justifyContent: 'flex-start',
        }}
      ></ScrollView>
    </SafeAreaView>
  )
}
