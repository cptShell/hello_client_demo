import { createContext, useContext } from 'react'
import type { RefObject } from 'react'

import type {
  SidebarGroupState,
  SidebarRootState,
} from './sidebar-types'

type SidebarRootContextValue = {
  registerGroup: (groupId: string) => () => void
  registerItem: (value: string, parentGroupId: string | null) => () => void
  setExpanded: (expanded: boolean) => void
  setOpenGroupId: (groupId: string | null) => void
  setValue: (value: string) => void
  state: SidebarRootState
}

type SidebarGroupContextValue = {
  contentId: string
  explicitlyOpen: boolean
  id: string
  state: SidebarGroupState
  triggerId: string
  triggerRef: RefObject<HTMLButtonElement | null>
}

const SidebarRootContext = createContext<SidebarRootContextValue | null>(null)
const SidebarGroupContext = createContext<SidebarGroupContextValue | null>(null)

export const SidebarRootProvider = SidebarRootContext.Provider
export const SidebarGroupProvider = SidebarGroupContext.Provider

export function useSidebarRootContext() {
  const context = useContext(SidebarRootContext)

  if (!context) {
    throw new Error('Sidebar components must be rendered inside Sidebar.Root')
  }

  return context
}

export function useSidebarGroupContext() {
  const context = useContext(SidebarGroupContext)

  if (!context) {
    throw new Error(
      'Sidebar group components must be rendered inside Sidebar.Group',
    )
  }

  return context
}

export function useOptionalSidebarGroupContext() {
  return useContext(SidebarGroupContext)
}
