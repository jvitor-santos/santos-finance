import { CreateUser } from '@components/Modal'
import { useUser } from '@hooks/useUser'
import { Heading, Image, View, Box, Input, Link } from 'native-base'
import { useState } from 'react'
import { Modal } from 'react-native'
import logo from '../../assets/logo.png'
import { Button } from '@components/Button'

export function Home() {
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin } = useUser()

  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <Heading flex={1} mt={'5rem'}>
        <Image alt="Logo do app" source={logo} size={56} />
      </Heading>
      <Box
        position={'absolute'}
        bg={'rgba(18, 18, 20, 0.9)'}
        width={'80%'}
        borderRadius={15}
        p={5}
        alignItems={'center'}
      >
        <Heading
          color="gray.100"
          fontSize={18}
          mb={4}
          fontFamily="heading"
          textAlign={'center'}
        >
          Login
        </Heading>
        <Input
          placeholder="Login"
          mt={4}
          bgColor={'white'}
          h={10}
          onChangeText={(text) => {
            setLogin(text)
          }}
          fontSize={16}
        />
        <Input
          placeholder="Digite a senha"
          mt={4}
          secureTextEntry
          bgColor={'white'}
          h={10}
          onChangeText={(text) => {
            setPassword(text)
          }}
          fontSize={16}
        />
        <Button
          title={'Entrar'}
          onPress={() => {
            handleLogin(login, password)
          }}
        />
        <Link
          mt={4}
          _text={{ color: 'white', fontSize: 'sm', fontWeight: '700' }}
          onPress={() => {
            setVisibleModalAdd(true)
          }}
        >
          Criar uma conta
        </Link>
        <Modal
          visible={visibleModalAdd}
          transparent={true}
          onRequestClose={() => setVisibleModalAdd(false)}
          animationType="slide"
        >
          <CreateUser handleClose={() => setVisibleModalAdd(false)} />
        </Modal>
      </Box>
    </View>
  )
}
