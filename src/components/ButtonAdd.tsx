import { MaterialIcons } from '@expo/vector-icons'
import { Button as ButtonNativeBase, Icon } from 'native-base'

export function ButtonAdd({ ...rest }) {
  return (
    <ButtonNativeBase
      bg={'gray.300'}
      borderColor="green.500"
      rounded="full"
      _pressed={{
        bg: 'gray.400',
      }}
      {...rest}
    >
      <Icon as={MaterialIcons} name="add" color="black" size={7} />
    </ButtonNativeBase>
  )
}
