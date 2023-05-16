import { Input } from '@components/Input'
import { useUser } from '@hooks/useUser'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import CryptoES from 'crypto-es'
import { Box, Heading, Image, Select, View } from 'native-base'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { Button } from './Button'
import { ButtonDelete } from './ButtonDelete'

export function AddYear({ handleClose }: any) {
  const { accountAddYear } = useUser()
  const [newYear, setNewYear] = useState('')
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: '40%' }}
            keyboardShouldPersistTaps="handled"
          >
            <Box
              bg={'rgba(18, 18, 20, 0.9)'}
              width={'80%'}
              borderRadius={15}
              marginLeft={'10%'}
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
                Adicionar um novo ano
              </Heading>
              <Input
                placeholder="Digite o ano"
                keyboardType={'numeric'}
                mt={4}
                onChangeText={(value) => setNewYear(value)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Button
                title={'Salvar'}
                onPress={() => {
                  if (newYear !== '') {
                    accountAddYear(newYear)
                    handleClose()
                  } else {
                    handleClose()
                  }
                }}
              />
            </Box>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleClose}
            ></TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export function AddDebit({ handleClose, handleYear, handleMonth }: any) {
  const { userId } = useUser()
  const [nameDebit, setNameDebit] = useState('')
  const [valueDebit, setValueDebit] = useState('')
  const realValueDebit = parseFloat(valueDebit.replace(',', '.'))

  const newDebit = {
    name: nameDebit,
    price: realValueDebit,
    status: true,
  }

  function addNewDebit() {
    if (nameDebit !== '' && realValueDebit !== 0) {
      if (userId) {
        const docRef = firestore()
          .collection('users')
          .doc(userId)
          .collection('years')
          .doc(handleYear)

        docRef.update({
          [handleMonth]: firestore.FieldValue.arrayUnion(newDebit),
        })
        handleClose()
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: '40%' }}
            keyboardShouldPersistTaps="handled"
          >
            <Box
              bg={'rgba(18, 18, 20, 0.9)'}
              width={'80%'}
              borderRadius={15}
              marginLeft={'10%'}
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
                Adicionar dívida
              </Heading>
              <Input
                placeholder="Nome da dívida"
                mt={4}
                onChangeText={(text) => setNameDebit(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Input
                placeholder="Valor"
                mt={4}
                keyboardType={'numeric'}
                onChangeText={(value) => setValueDebit(value)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Button
                title={'Salvar'}
                onPress={() => {
                  addNewDebit()
                }}
              />
            </Box>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleClose}
            ></TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export function Login({ handleClose, handleGetPassword, handleGetId }: any) {
  const Decrypted = CryptoES.AES.decrypt(handleGetPassword, 'your password')
  const DecryptedPassword = Decrypted.toString(CryptoES.enc.Utf8)
  const [password, setPassword] = useState('')
  const { saveId } = useUser()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: '40%' }}
            keyboardShouldPersistTaps="handled"
          >
            <Box
              bg={'rgba(18, 18, 20, 0.9)'}
              width={'80%'}
              borderRadius={15}
              marginLeft={'10%'}
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
                placeholder="Digite a senha"
                mt={4}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Button
                title={'Entrar'}
                onPress={() => {
                  if (password === DecryptedPassword) {
                    saveId(handleGetId)
                  } else {
                    Alert.alert('Senha incorreta')
                  }
                }}
              />
            </Box>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleClose}
            ></TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export function CreateUser({ handleClose }: any) {
  const { listAccounts } = useUser()
  const key = uuidv4()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const criptoPassword = CryptoES.AES.encrypt(
    password,
    'your password',
  ).toString()
  const validate = listAccounts.some((item) => item.name === name)

  async function handleNewUser() {
    if (password === '') {
      await firestore().collection('users').doc(key).set({
        name,
        password: null,
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/santos-finance.appspot.com/o/avatar%2Fdefault.jpg?alt=media&token=d3d29115-5e7d-441f-8104-93db73184f93',
        id: key,
        listReceipts: [],
      })
      handleClose()
    } else {
      await firestore().collection('users').doc(key).set({
        name,
        password: criptoPassword,
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/santos-finance.appspot.com/o/avatar%2Fdefault.jpg?alt=media&token=d3d29115-5e7d-441f-8104-93db73184f93',
        id: key,
        listReceipts: [],
      })
      handleClose()
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: '40%' }}
            keyboardShouldPersistTaps="handled"
          >
            <Box
              bg={'rgba(18, 18, 20, 0.9)'}
              width={'80%'}
              borderRadius={15}
              marginLeft={'10%'}
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
                Criar usuario
              </Heading>
              <Input
                placeholder="Digite seu nome"
                mt={4}
                onChangeText={(text) => setName(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Input
                placeholder="Digite a senha (opcional)"
                mt={4}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Input
                placeholder="Confirme a senha (opcional)"
                mt={4}
                secureTextEntry
                onChangeText={(text) => setPasswordConfirm(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Button
                title={'Criar conta'}
                onPress={() => {
                  if (password === passwordConfirm && !validate) {
                    handleNewUser()
                  } else if (validate) {
                    Alert.alert('Nome já existe')
                  } else {
                    Alert.alert('Senhas não conferem')
                  }
                }}
              />
            </Box>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleClose}
            ></TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export function CreatePassword({ handleClose }: any) {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { userId } = useUser()

  const criptoPassword = CryptoES.AES.encrypt(
    password,
    'your password',
  ).toString()

  async function handleNewPassword() {
    if (password === passwordConfirm && password !== '') {
      await firestore().collection('users').doc(userId).update({
        password: criptoPassword,
      })
      handleClose()
    } else if (password === '' && passwordConfirm === '') {
      await firestore().collection('users').doc(userId).update({
        password: null,
      })
      handleClose()
    } else {
      Alert.alert('Senhas não conferem')
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: '40%' }}
            keyboardShouldPersistTaps="handled"
          >
            <Box
              bg={'rgba(18, 18, 20, 0.9)'}
              width={'80%'}
              borderRadius={15}
              marginLeft={'10%'}
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
                Criar ou alterar senha
              </Heading>
              <Input
                placeholder="Digite a senha (opcional)"
                mt={4}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Input
                placeholder="Confirme a senha (opcional)"
                mt={4}
                secureTextEntry
                onChangeText={(text) => setPasswordConfirm(text)}
                bgColor={'white'}
                h={10}
                fontSize={16}
              />
              <Button
                title={'Salvar senha'}
                onPress={() => {
                  handleNewPassword()
                }}
              />
            </Box>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleClose}
            ></TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export function SettingDebit({
  handleClose,
  handleListDebits,
  handleYear,
  handleMonth,
}: any) {
  const { userId } = useUser()
  const [debitIndex, setDebitIndex] = useState(0)

  function payDebit() {
    const docRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('years')
      .doc(handleYear)
    docRef.get().then((doc) => {
      const data = doc.data()[handleMonth]
      const updateDebit = [...data]
      updateDebit[debitIndex].status = false
      docRef.update({
        [handleMonth]: updateDebit,
      })
    })
    handleClose()
  }

  function deleteDebit() {
    const docRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('years')
      .doc(handleYear)
    docRef.get().then((doc) => {
      const data = doc.data()[handleMonth]
      const updateDebit = [...data]
      updateDebit.splice(debitIndex, 1)
      docRef.update({
        [handleMonth]: updateDebit,
      })
    })
    handleClose()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: '40%' }}
            keyboardShouldPersistTaps="handled"
          >
            <Box
              bg={'rgba(18, 18, 20, 0.9)'}
              width={'80%'}
              borderRadius={15}
              marginLeft={'10%'}
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
                Contas:
              </Heading>
              <Select
                width={'full'}
                color={'white'}
                size={'15'}
                textAlign={'center'}
                fontWeight={'bold'}
                accessibilityLabel="Choose debbit"
                placeholder="Selecione uma conta"
                onValueChange={(indexvalue) =>
                  setDebitIndex(Number(indexvalue))
                }
              >
                {handleListDebits.map((item, index) => {
                  return (
                    <Select.Item key={index} label={item.name} value={index} />
                  )
                })}
              </Select>
              <View flexDirection={'row'}>
                <Button
                  title={'Pagar'}
                  width={'100px'}
                  onPress={() => payDebit()}
                />
                <Button
                  title={'Remover'}
                  width={'120px'}
                  ml={'15px'}
                  bg={'red.500'}
                  onPress={() => deleteDebit()}
                />
              </View>
            </Box>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleClose}
            ></TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
          ></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export function SettingPicture({ handleClose, handlePicture }: any) {
  const { userId } = useUser()
  function deletePicture() {
    const docRef = firestore().collection('users').doc(userId)
    docRef.update({
      listReceipts: firestore.FieldValue.arrayRemove(handlePicture),
    })
    const storageRef = storage().refFromURL(handlePicture)
    storageRef.delete()
    handleClose()
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(18, 18, 20, 0.9)' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={handleClose}
        ></TouchableOpacity>

        <Image
          alt="profile picture"
          source={{ uri: handlePicture }}
          width={'300'}
          height={'300'}
          alignSelf={'center'}
        />
        <View alignItems={'center'} mt={'30px'}>
          <ButtonDelete w={'50px'} onPress={() => deletePicture()} />
        </View>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={handleClose}
        ></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
