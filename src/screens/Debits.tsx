import { Button } from '@components/Button'
import { ButtonAdd } from '@components/ButtonAdd'
import { ButtonPicture } from '@components/ButtonPicture'
import { ButtonSetting } from '@components/ButtonSetting'
import { Loading } from '@components/Loading'
import { AddDebit, SettingDebit } from '@components/Modal'
import { useUser } from '@hooks/useUser'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import {
  Box,
  Container,
  FlatList,
  HStack,
  Text,
  VStack,
  View,
} from 'native-base'
import { useEffect, useState } from 'react'
import { Modal } from 'react-native'

type Debit = {
  name: string
  price: number
  status: boolean
}

export function Debits() {
  const route = useRoute()
  const { year, monthName, monthId } = route.params
  const { userId, handlePictureSelected, upLoadLoading } = useUser()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalSetting, setVisibleModalSetting] = useState(false)
  const [listDebits, setListDebits] = useState<Debit[]>([])

  useEffect(() => {
    const docRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('years')
      .doc(year)
    docRef.onSnapshot((doc) => {
      const data = doc.data()[monthId]
      setListDebits(data)
    })
  }, [userId, year, monthId])

  const totalPrice = listDebits.reduce((accumulator, currentValue) => {
    if (!currentValue.status) {
      return accumulator
    }
    return accumulator + currentValue.price
  }, 0)

  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <Container
        bg={'gray.600'}
        marginTop={'-5px'}
        h={'550px'}
        w={'full'}
        alignItems={'center'}
        marginBottom={'60px'}
        borderRadius={'25px'}
      >
        <Text color={'gray.100'} fontFamily={'heading'} fontSize={'20px'}>
          Dividas do mês de {monthName}
        </Text>
        <Box flex={1}>
          {upLoadLoading ? (
            <Box
              mt={'100px'}
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor={'rgba(18, 18, 20, 0.9)'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              h={'300px'}
            >
              <Text
                color={'white'}
                fontSize={'20px'}
                fontFamily={'heading'}
                mt={'80px'}
              >
                Salvando foto
              </Text>
              <Loading />
            </Box>
          ) : null}
          <FlatList
            data={listDebits}
            w={'300px'}
            renderItem={({ item }) => (
              <VStack flexDirection="row" justifyContent="space-between">
                <Text
                  color={item.status ? 'gray.100' : 'green.300'}
                  fontFamily="heading"
                  fontSize="15px"
                  marginTop="20px"
                >
                  {item.name}
                </Text>
                <Text
                  color={item.status ? 'gray.100' : 'green.300'}
                  fontFamily="heading"
                  fontSize="15px"
                  marginTop="20px"
                  textAlign="right"
                >
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </Text>
              </VStack>
            )}
            _contentContainerStyle={{ paddingBottom: '10px' }}
          />
        </Box>
        <Box borderTopWidth={1} borderTopColor={'white'} w={'full'}>
          <HStack flexDirection={'row'} w={'full'}>
            <Box w={'50%'} h={'50px'}>
              <Box h={'50px'} paddingLeft={'20px'} paddingTop={'20px'}>
                <Text
                  color={'gray.100'}
                  fontFamily={'heading'}
                  fontSize={'20px'}
                >
                  Falta pagar
                </Text>
              </Box>
            </Box>
            <Box w={'50%'} h={'50px'} marginLeft={'25px'}>
              <Box h={'50px'} paddingLeft={'20px'} paddingTop={'20px'}>
                <Text
                  color={'gray.100'}
                  fontFamily={'heading'}
                  fontSize={'20px'}
                >
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </Text>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Container>
      <Box marginTop={'-50px'}>
        <View flexDirection={'row'}>
          <ButtonPicture mr={'20px'} onPress={() => handlePictureSelected()} />
          <ButtonAdd onPress={() => setVisibleModal(true)} />
          <ButtonSetting
            ml={'20px'}
            onPress={() => setVisibleModalSetting(true)}
          />
        </View>

        <Modal
          visible={visibleModal}
          transparent={true}
          onRequestClose={() => setVisibleModal(false)}
          animationType="slide"
        >
          <AddDebit
            handleClose={() => setVisibleModal(false)}
            handleYear={year}
            handleMonth={monthId}
          />
        </Modal>
        <Modal
          visible={visibleModalSetting}
          transparent={true}
          onRequestClose={() => setVisibleModalSetting(false)}
          animationType="slide"
        >
          <SettingDebit
            handleClose={() => setVisibleModalSetting(false)}
            handleListDebits={listDebits}
            handleYear={year}
            handleMonth={monthId}
          />
        </Modal>
      </Box>
      <Button title="Voltar" onPress={() => navigation.goBack()} mt={'25px'} />
    </View>
  )
}
