import type { ReactNode } from 'react'

export type RouterMenuRootProps = {
  ariaLabel?: string
  children: ReactNode
}

export type RouterMenuItemProps = {
  disabled?: boolean
  icon?: ReactNode
  label: string
  to: string
}

export type RouterMenuGroupProps = {
  children: ReactNode
  icon?: ReactNode
  label: string
}
