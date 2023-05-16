import { Button } from '@components/Button'
import {
  Box,
  Button as ButtonNativeBase,
  FlatList,
  Image,
  Text,
  View,
} from 'native-base'
import icon from '../../assets/icon-logo.png'

import { ButtonAdd } from '@components/ButtonAdd'
import { AddYear } from '@components/Modal'
import { useUser } from '@hooks/useUser'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useState } from 'react'
import { Modal } from 'react-native'

export function Yers() {
  const [visibleModal, setVisibleModal] = useState(false)
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { listYears } = useUser()

  if (listYears.length !== 0) {
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
          Selecione o Ano
        </Text>
        <FlatList
          data={listYears}
          renderItem={({ item }) => (
            <ButtonNativeBase
              w={'100px'}
              h={'50px'}
              bg={'gray.600'}
              marginTop={'5px'}
              marginRight={'5px'}
              alignItems={'center'}
              justifyContent={'center'}
              _pressed={{ borderColor: '#FFFFFF', borderWidth: '2px' }}
              onPress={() => navigation.navigate('months', { year: item })}
            >
              <Text color={'#fff'}>{item}</Text>
            </ButtonNativeBase>
          )}
        />
        <Box marginTop={'100px'}>
          <ButtonAdd onPress={() => setVisibleModal(true)} />
          <Modal
            visible={visibleModal}
            transparent={true}
            onRequestClose={() => setVisibleModal(false)}
            animationType="slide"
          >
            <AddYear handleClose={() => setVisibleModal(false)} />
          </Modal>
        </Box>
        <Box marginTop={'50px'}>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </Box>
      </View>
    )
  } else {
    return (
      <View justifyContent={'center'} alignItems={'center'}>
        <Text
          color={'gray.100'}
          fontFamily={'heading'}
          fontSize={'20px'}
          mt={'200px'}
          ml={'50px'}
          mr={'50px'}
        >
          Não há anos cadastrados, aperte no botão abaixo para adicionar um ano
        </Text>
        <Box marginTop={'100px'}>
          <ButtonAdd onPress={() => setVisibleModal(true)} />
          <Modal
            visible={visibleModal}
            transparent={true}
            onRequestClose={() => setVisibleModal(false)}
            animationType="slide"
          >
            <AddYear handleClose={() => setVisibleModal(false)} />
          </Modal>
        </Box>
        <Box marginTop={'50px'}>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </Box>
      </View>
    )
  }
}
