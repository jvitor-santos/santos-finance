import { Button } from '@components/Button'
import {
  Box,
  Button as ButtonNativeBase,
  FlatList,
  Image,
  Text,
  View,
} from 'native-base'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import icon from '../../assets/icon-logo.png'

export function Months() {
  const route = useRoute()
  const { year } = route.params
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const months = [
    { name: 'Janeiro', id: 'january' },
    { name: 'Fevereiro', id: 'february' },
    { name: 'Março', id: 'march' },
    { name: 'Abril', id: 'april' },
    { name: 'Maio', id: 'may' },
    { name: 'Junho', id: 'june' },
    { name: 'Julho', id: 'july' },
    { name: 'Agosto', id: 'august' },
    { name: 'Setembro', id: 'september' },
    { name: 'Outubro', id: 'october' },
    { name: 'Novembro', id: 'november' },
    { name: 'Dezembro', id: 'december' },
  ]
  return (
    <View justifyContent={'center'} alignItems={'center'} mt={'100px'}>
      <Image alt="Logo do app" source={icon} size={16} />
      <Text
        color={'gray.100'}
        fontFamily={'heading'}
        fontSize={'20px'}
        mt={'50px'}
        mb={'30px'}
      >
        Selecione algum mês de {year}
      </Text>
      <FlatList
        data={months}
        renderItem={({ item }) => (
          <ButtonNativeBase
            w={'100px'}
            h={'80px'}
            bg={'gray.600'}
            marginTop={'5px'}
            marginRight={'5px'}
            alignItems={'center'}
            justifyContent={'center'}
            _pressed={{ borderColor: '#FFFFFF', borderWidth: '2px' }}
            onPress={() =>
              navigation.navigate('debits', {
                year,
                monthName: item.name,
                monthId: item.id,
              })
            }
          >
            <Text color={'#FFF'}>{item.name}</Text>
          </ButtonNativeBase>
        )}
        numColumns={3}
      />
      <Box marginTop={'100px'}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </Box>
    </View>
  )
}
