import type { ReactNode } from 'react'
import { RouterMenuGroupContext } from './router-menu-group-context'

export function RouterMenuGroupProvider({ children }: { children: ReactNode }) {
  return <RouterMenuGroupContext.Provider value>{children}</RouterMenuGroupContext.Provider>
}
