import { createContext, useContext } from 'react'

type RouterMenuGroupContextValue = {
  registerRoute: (routeId: string, to: string) => void
  unregisterRoute: (routeId: string) => void
  updateRoute: (routeId: string, to: string) => void
}

export const RouterMenuGroupContext =
  createContext<RouterMenuGroupContextValue | null>(null)

export function useRouterMenuGroupContext() {
  return useContext(RouterMenuGroupContext)
}
