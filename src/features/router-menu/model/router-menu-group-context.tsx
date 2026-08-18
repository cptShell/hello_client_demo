import { createContext, useContext } from 'react'

export const RouterMenuGroupContext = createContext(false)

export function useRouterMenuGroupContext() {
  return useContext(RouterMenuGroupContext)
}
