import { createContext, useContext } from 'react'

type RouterMenuContextValue = {
  markLinkNavigation: () => void
}

export const RouterMenuContext = createContext<RouterMenuContextValue | null>(
  null,
)

export function useRouterMenuContext() {
  const context = useContext(RouterMenuContext)
  if (!context) {
    throw new Error('RouterMenu components must be rendered inside RouterMenu')
  }
  return context
}
