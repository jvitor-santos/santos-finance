import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { MMKV } from 'react-native-mmkv'
import CryptoES from 'crypto-es'
import { Alert } from 'react-native'

const LocalStorage = new MMKV({ id: 'myapp' })

type Account = {
  login?: string
  name?: string
  password?: string | null | undefined
  avatar?: string
  id?: string
  yers?: any
}

interface UserContextDataProps {
  listAccounts: Account[]
  userId: any
  saveId: any
  handleUserPhotoSelected: any
  avatar: string
  listYears: any
  accountAddYear: any
  handlePictureSelected: any
  listReceipts: any
  upLoadLoading: boolean
  handleLogin: any
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps,
)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [userId, setUserId] = useState<string | null | undefined>()
  const [avatar, setAvatar] = useState('')
  const [listYears, setListYears] = useState([])
  const [listReceipts, setListReceipts] = useState([])
  const [upLoadLoading, setUpLoadLoading] = useState(false)
  useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const accounts = querySnapshot.docs.map((doc) => doc.data())
        setAccounts(accounts)
      })
  }, [])

  function handleLogin(login: string, password: string) {
    firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data())
        const user = users.find((user) => user.login === login)

        if (user && user.password !== null) {
          const Decrypted = CryptoES.AES.decrypt(user.password, 'your password')
          const DecryptedPassword = Decrypted.toString(CryptoES.enc.Utf8)

          if (password === DecryptedPassword) {
            setUserId(user.id)
            LocalStorage.set('userId', user.id)
          } else {
            Alert.alert('Senha incorreta')
          }
        } else if (user && user.password === null && password === '') {
          setUserId(user.id)
          LocalStorage.set('userId', user.id)
        } else if (user && user.password === null && password !== '') {
          Alert.alert('Senha incorreta')
        } else {
          Alert.alert('Usuario não encontrado')
        }
      })
  }

  function fetchUser() {
    const data = LocalStorage.getString('userId')
    setUserId(data || '')
  }

  useEffect(() => {
    if (userId && userId !== '') {
      firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then((data) => {
          const userData = data.data()
          if (userData) {
            setAvatar(userData.avatar)
          }
        })
      firestore()
        .collection('users')
        .doc(userId)
        .onSnapshot((doc) => {
          const data = doc.data()
          if (data) {
            setListReceipts(data.listReceipts)
          }
        })
    }
  }, [userId])

  async function handleUserPhotoSelected() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (!photoSelected.canceled) {
      setAvatar(photoSelected.assets[0].uri)
      const reference = storage().ref(`/avatar/${userId}`)
      const uploadTask = reference.putFile(photoSelected.assets[0].uri)
      uploadTask.then(async () => {
        const urlImage = await storage()
          .ref(`avatar/${userId}`)
          .getDownloadURL()
        if (userId) {
          firestore().collection('users').doc(userId).update({
            avatar: urlImage,
          })
        }
      })
    }
  }

  async function handlePictureSelected() {
    const data = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0]
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (!photoSelected.canceled) {
      setUpLoadLoading(true)
      const reference = storage().ref(`/receipt/${userId}-${data}`)
      const uploadTask = reference.putFile(photoSelected.assets[0].uri)
      uploadTask.then(async () => {
        const urlImage = await storage()
          .ref(`receipt/${userId}-${data}`)
          .getDownloadURL()
        if (userId) {
          firestore()
            .collection('users')
            .doc(userId)
            .update({
              listReceipts: firestore.FieldValue.arrayUnion(urlImage),
            })
          setUpLoadLoading(false)
        }
      })
    }
  }

  useEffect(() => {
    const listener = LocalStorage.addOnValueChangedListener(() => {
      fetchUser()
    })
    return () => listener.remove()
  }, [])

  useEffect(() => {
    fetchUser()
    if (!userId) {
      setAvatar('')
    }
  }, [userId])

  function saveId(id: string) {
    LocalStorage.set('userId', id)
  }

  useEffect(() => {
    if (userId) {
      firestore()
        .collection('users')
        .doc(userId)
        .collection('years')
        .onSnapshot((querySnapshot) => {
          const years = querySnapshot.docs.map((doc) => doc.data().year)
          setListYears(years)
        })
    }
  }, [userId])

  function accountAddYear(year: any) {
    if (userId) {
      firestore()
        .collection('users')
        .doc(userId)
        .collection('years')
        .doc(year)
        .set({
          year,
          january: [],
          february: [],
          march: [],
          april: [],
          may: [],
          june: [],
          july: [],
          august: [],
          september: [],
          october: [],
          november: [],
          december: [],
        })
    }
  }

  return (
    <UserContext.Provider
      value={{
        listAccounts: accounts,
        userId,
        saveId,
        avatar,
        handleUserPhotoSelected,
        listYears,
        accountAddYear,
        handlePictureSelected,
        listReceipts,
        upLoadLoading,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
