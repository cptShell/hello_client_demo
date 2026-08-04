import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

type SidebarListProps = ComponentPropsWithoutRef<'ul'>

export const SidebarList = forwardRef<HTMLUListElement, SidebarListProps>(
  function SidebarList({ children, ...listProps }, forwardedRef) {
    return (
      <ul {...listProps} ref={forwardedRef}>
        {children}
      </ul>
    )
  },
)
