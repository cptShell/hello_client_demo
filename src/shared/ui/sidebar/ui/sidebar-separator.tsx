import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

type SidebarSeparatorProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'aria-orientation' | 'children' | 'role'
>

export const SidebarSeparator = forwardRef<
  HTMLLIElement,
  SidebarSeparatorProps
>(function SidebarSeparator(separatorProps, forwardedRef) {
  return (
    <li
      {...separatorProps}
      aria-orientation="horizontal"
      ref={forwardedRef}
      role="separator"
    />
  )
})
