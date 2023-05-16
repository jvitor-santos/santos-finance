import { useContext } from 'react'

import { UserContext } from '@contexts/UserContexts'

export function useUser() {
  const context = useContext(UserContext)

  return context
}
