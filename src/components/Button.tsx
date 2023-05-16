import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg={'#2e2e48'}
      borderRadius={6}
      zIndex={99}
      marginTop={3}
      w={'200px'}
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : '#232339',
      }}
      {...rest}
    >
      <Text color={'white'} fontFamily={'heading'} fontSize={14}>
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
