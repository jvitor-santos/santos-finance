import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { CreatePassword } from '@components/Modal'
import { useUser } from '@hooks/useUser'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { Box, Skeleton, View } from 'native-base'
import { useState } from 'react'
import { Modal } from 'react-native'

export function UserOptions() {
  const [visibleModal, setVisibleModal] = useState(false)
  const PHOTO_SIZE = 32
  const { saveId, avatar, handleUserPhotoSelected } = useUser()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      {avatar ? (
        <Avatar
          source={{
            uri: avatar,
          }}
          size={PHOTO_SIZE}
          alt="Foto do usuario"
          mt={'-60px'}
          mb={'30px'}
        />
      ) : (
        <Skeleton
          w={PHOTO_SIZE}
          h={PHOTO_SIZE}
          rounded={'full'}
          mt={'-60px'}
          mb={'30px'}
        />
      )}

      <Box alignItems={'center'}>
        <Button
          title="Ver dividas"
          onPress={() => navigation.navigate('yers')}
        />
        <Button title="Alterar senha" onPress={() => setVisibleModal(true)} />
        <Button
          title="Alterar foto"
          onPress={() => handleUserPhotoSelected()}
        />
        <Button
          title="Ver comprovantes"
          onPress={() => navigation.navigate('receipts')}
        />
        <Modal
          visible={visibleModal}
          transparent={true}
          onRequestClose={() => setVisibleModal(false)}
          animationType="slide"
        >
          <CreatePassword handleClose={() => setVisibleModal(false)} />
        </Modal>
      </Box>
      <Box
        position={'absolute'}
        bottom={0}
        left={0}
        mb={'20px'}
        alignItems={'center'}
        width={'100%'}
      >
        <Button title="Sair" onPress={() => saveId('')} />
      </Box>
    </View>
  )
}
