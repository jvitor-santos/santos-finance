import { Avatar } from '@components/Avatar'
import { ButtonAdd } from '@components/ButtonAdd'
import { CreateUser, Login } from '@components/Modal'
import { useUser } from '@hooks/useUser'
import { Container, FlatList, Heading, Image, Text, View } from 'native-base'
import { useState } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import logo from '../../assets/logo.png'

export function Home() {
  const { saveId } = useUser()
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)
  const [tryPassword, setTryPassword] = useState<string | null | undefined>()
  const [accountId, setAccountId] = useState<string | null>()

  const { listAccounts } = useUser()

  if (listAccounts && listAccounts.length !== 0) {
    return (
      <View flex={1} justifyContent={'center'} alignItems={'center'}>
        <Heading mt={'100px'} flex={1}>
          <Image alt="Logo do app" source={logo} size={56} />
        </Heading>
        <View flex={1} alignItems={'center'} mt={'-500px'}>
          <FlatList
            data={listAccounts}
            numColumns={3}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  margin: 10,
                }}
                onPress={() => {
                  if (item.password === null) {
                    saveId(item.id)
                  } else {
                    setTryPassword(item.password)
                    setAccountId(item.id)
                    setVisibleModal(true)
                  }
                }}
              >
                <Avatar
                  source={{
                    uri: item.avatar,
                  }}
                  size={'90px'}
                  alt="Foto do usuario"
                />
                <Text color={'white'}>{item.name}</Text>
              </TouchableOpacity>
            )}
            _contentContainerStyle={{ paddingBottom: '30px' }}
          />
          <Container marginBottom={'20%'} alignItems={'center'}>
            <Text color={'white'} fontSize={'2xl'} mb={'10px'}>
              Adicionar usuário
            </Text>
            <ButtonAdd
              onPress={() => {
                setVisibleModalAdd(true)
              }}
            />
          </Container>
          <Modal
            visible={visibleModal}
            transparent={true}
            onRequestClose={() => setVisibleModal(false)}
            animationType="slide"
          >
            <Login
              handleClose={() => setVisibleModal(false)}
              handleGetPassword={tryPassword}
              handleGetId={accountId}
            />
          </Modal>
          <Modal
            visible={visibleModalAdd}
            transparent={true}
            onRequestClose={() => setVisibleModalAdd(false)}
            animationType="slide"
          >
            <CreateUser handleClose={() => setVisibleModalAdd(false)} />
          </Modal>
        </View>
      </View>
    )
  } else {
    return (
      <View flex={1} alignItems={'center'} mt={'60%'}>
        <Heading mt={'100px'} flex={1}>
          <Image alt="Logo do app" source={logo} size={56} />
        </Heading>
        <Container marginBottom={'50%'} alignItems={'center'}>
          <Text color={'white'} fontSize={'2xl'} mb={'10px'}>
            Adicionar usuário
          </Text>
          <ButtonAdd
            onPress={() => {
              setVisibleModalAdd(true)
            }}
          />
        </Container>
        <Modal
          visible={visibleModalAdd}
          transparent={true}
          onRequestClose={() => setVisibleModalAdd(false)}
          animationType="slide"
        >
          <CreateUser handleClose={() => setVisibleModalAdd(false)} />
        </Modal>
      </View>
    )
  }
}
