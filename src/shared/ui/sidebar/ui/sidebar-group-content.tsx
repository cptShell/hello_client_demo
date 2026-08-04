import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { useSidebarGroupContext } from '../model/sidebar-context'
import {
  resolveStateClassName,
  type SidebarGroupState,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarGroupContentProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'className' | 'hidden'
> & {
  className?: StateClassName<SidebarGroupState>
}

export const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(function SidebarGroupContent(
  { children, className, ...contentProps },
  forwardedRef,
) {
  const group = useSidebarGroupContext()

  return (
    <div
      {...contentProps}
      aria-labelledby={group.triggerId}
      className={resolveStateClassName(className, group.state)}
      hidden={!group.state.open}
      id={group.contentId}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})
