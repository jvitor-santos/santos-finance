import { extendTheme } from 'native-base'

export const theme = extendTheme({
  fonts: {
    heading: 'Outfit, sans-serif',
    body: 'DM Sans, sans-serif',
  },
  colors: {
    gray: {
      700: '#611888',
      600: '#2e2e48',
      100: '#E2E6EE',
    },
    green: {
      700: '#00875F',
    },
  },
})
