import { Button } from '@components/Button'
import { SettingPicture } from '@components/Modal'
import { useUser } from '@hooks/useUser'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { FlatList, Heading, Image, Text, View } from 'native-base'
import { useState } from 'react'
import { Modal, TouchableOpacity } from 'react-native'

export function Receipts() {
  const [visibleModal, setVisibleModal] = useState(false)
  const [picture, setPicture] = useState('')
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { listReceipts } = useUser()
  if (listReceipts !== undefined && listReceipts.length >= 1) {
    return (
      <View flex={1} alignItems={'center'} mt={'10%'}>
        <Heading color={'white'} mb={'10px'}>
          Comprovantes
        </Heading>
        <FlatList
          data={listReceipts}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setVisibleModal(true)
                setPicture(item)
              }}
            >
              <Image
                alt="Foto do comprovante"
                source={{ uri: item }}
                w={'85px'}
                h={'85px'}
                ml={'10px'}
                mb={'10px'}
              />
            </TouchableOpacity>
          )}
          _contentContainerStyle={{ paddingBottom: '30px' }}
        />
        <Button
          title="Voltar"
          onPress={() => {
            navigation.goBack()
          }}
          mb={'10px'}
        />
        <Modal
          visible={visibleModal}
          transparent={true}
          onRequestClose={() => setVisibleModal(false)}
          animationType="fade"
        >
          <SettingPicture
            handleClose={() => setVisibleModal(false)}
            handlePicture={picture}
          />
        </Modal>
      </View>
    )
  } else {
    return (
      <View flex={1} alignItems={'center'} mt={'70%'}>
        <Text fontSize={'20px'} color={'white'}>
          Você ainda não possui comprovantes
        </Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    )
  }
}
